import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../Core/services/login/login.service';
import {LanguagesService} from '../Core/services/lang/languages.service';
import {Subscription} from 'rxjs';
declare let alertify:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
  loginForm:FormGroup
  hide:boolean=true
  private subscription: Subscription;
  constructor(private router: Router, private  authService:LoginService,
              private languageService:LanguagesService,  private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.loginForm= new FormGroup({
      Email : new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    })
    this.subscription = this.authService.user$.subscribe((x) => {
      if (this.route.snapshot.url[0].path === 'login') {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        if (x && accessToken && refreshToken) {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
          this.router.navigate([returnUrl]);
        }
      } // optional touch-up: if a tab shows login page, then refresh the page to reduce duplicate login
    });

  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  submit() {
    const body = {
      "Email": this.loginForm.controls['Email'].value.split(' ').join(''),
      "Password": this.loginForm.controls['Password'].value.split(' ').join(''),
    }
    this.authService.login(body).subscribe(
      () => {
        this.router.navigate(['home'])
      },
      error => {
        if(error.error.messages){
          error.error.messages.forEach(e=>{
            if(e.lang_id==this.languageService.select.id){
              alertify.error(e.messageLang);
            }
          })
        }
      }
    )
  }
  public errorHandling = (control: string, error: string) => {
    return this.loginForm.controls[control].hasError(error);
  }
  get Password() {
    return this.loginForm.get('Password');
  }
}
