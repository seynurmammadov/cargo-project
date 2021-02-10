import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../Core/services/user/user.service';
import {LanguagesService} from '../Core/services/lang/languages.service';
import {TranslateService} from '@ngx-translate/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
declare let alertify:any
@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})

export class RestorePasswordComponent implements OnInit {
  id:number

  Form:FormGroup
  constructor(private activatedRoute:ActivatedRoute,
              private route:Router,
              private service:UserService,
              private languageService:LanguagesService,
              private translate: TranslateService,) {
    this.activatedRoute.params.subscribe(param=>{
      this.id=param.id
    })
    this.Form= new FormGroup({
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
      ]),
      CheckPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
        RxwebValidators.compare({fieldName:'Password'})
      ]),
    })
  }
  public errorHandling = (control: string, error: string) => {
    return this.Form.controls[control].hasError(error);
  }
  ngOnInit(): void {

  }

  sendPass(){
    const body = new FormData();
    body.append("id",this.id.toString())
    body.append("NewPassword",this.Form.controls["Password"].value)
      this.service.restore(body).subscribe(()=> {
      alertify.success(this.translate.instant("Restored"));
      setTimeout(()=>{
          this.route.navigate(['login'])
        },
        2500)
    },
    error => {
      error.error.messages.forEach(e => {
        if (e.lang_id == this.languageService.select.id) {
          alertify.error(e.messageLang);
        }
      })
    })
  }
  get Password() {
    return this.Form.get('Password');
  }
}
