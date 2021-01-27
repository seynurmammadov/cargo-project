import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {LoginService} from '../services/login/login.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private authService: LoginService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.authService.clearLocalStorage();
          this.router.navigate(['login'], {
            queryParams: { returnUrl: this.router.routerState.snapshot.url },
          });
        }

        if (!environment.production) {
          console.error(err);
        }
        return throwError(err);
      })
    );
  }
}
