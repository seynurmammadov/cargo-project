import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../global/global.service';
import { delay, finalize, map, tap} from 'rxjs/operators';
import {BehaviorSubject, of, Subscription} from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';
import {Router} from '@angular/router';
import {ApplicationUser} from '../../models/ApplicationUser';

interface LoginResult {
  username: string;
  role: string;
  originalUserName: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnDestroy{
  private readonly path:string;
  private timer: Subscription;
  private _user = new BehaviorSubject<ApplicationUser>(null);
  end:boolean=false
  user$: Observable<ApplicationUser> = this._user.asObservable();

  private storageEventListener(event: StorageEvent) {
    if (event.storageArea === localStorage) {
      if (event.key === 'logout-event') {
        this.stopTokenTimer();
        this._user.next(null);
      }
      if (event.key === 'login-event') {
        this.stopTokenTimer();
        this.http.get<LoginResult>(`${this.path}Auth/user`).subscribe((x) => {

          this._user.next({
            username: x.username,
            role: x.role,
            originalUserName: x.originalUserName,
          });
        });
      }
    }
  }


  constructor(private http:HttpClient,private global:GlobalService,private router: Router) {
    this.path=global.path
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
  }

  login(body) {
    return this.http
      .post<LoginResult>(`${this.path}Auth/login`, body)
      .pipe(
        map((x) => {
          this._user.next({
            username: x.username,
            role: x.role,
            originalUserName: x.originalUserName,
          });
          this.setLocalStorage(x);
          this.startTokenTimer();
          this.end=true;
          return x;
        })
      );
  }

  logout() {
    this.http
      .post<unknown>(`${this.path}Auth/logout`, {})
      .pipe(
        finalize(() => {
          this.clearLocalStorage();
          this._user.next(null);
          this.stopTokenTimer();
          this.end=false;
          this.router.navigate(['login']);
        })
      )
      .subscribe();
  }

  refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      this.clearLocalStorage();
      return of(null);
    }

    return this.http
      .post<LoginResult>(`${this.path}Auth/refresh-token`, { refreshToken })
      .pipe(
        map((x) => {
          this._user.next({
            username: x.username,
            role: x.role,
            originalUserName: x.originalUserName,
          });
          this.end=true;
          this.setLocalStorage(x);
          this.startTokenTimer();
          return x;
        })
      );
  }

  setLocalStorage(x: LoginResult) {
    localStorage.setItem('access_token', x.accessToken);
    localStorage.setItem('refresh_token', x.refreshToken);
    localStorage.setItem('login-event', 'login' + Math.random());
  }

  clearLocalStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.setItem('logout-event', 'logout' + Math.random());
  }

  private getTokenRemainingTime() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return 0;
    }
    const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    return expires.getTime() - Date.now();
  }

  private startTokenTimer() {
    const timeout = this.getTokenRemainingTime();
    this.timer = of(true)
      .pipe(
        delay(timeout),
        tap(() => this.refreshToken().subscribe())
      )
      .subscribe();
  }

  private stopTokenTimer() {
    this.timer?.unsubscribe();
  }



}
