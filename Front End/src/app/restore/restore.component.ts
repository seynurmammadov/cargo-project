import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {UserService} from '../Core/services/user/user.service';
import {LanguagesService} from '../Core/services/lang/languages.service';
import {NewsService} from '../Core/services/Admin/news/news.service';
import {TranslateService} from '@ngx-translate/core';
declare let alertify:any
@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.scss']
})
export class RestoreComponent implements OnInit {

  constructor(private service:UserService,
              private languageService:LanguagesService,
              private translate: TranslateService,) { }

  ngOnInit(): void {
  }
  title:string="Restore Password"
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  send(){
    this.service.send(this.emailFormControl.value).subscribe(()=> {
        alertify.success(this.translate.instant("successEmail"));
      },
      error => {
        error.error.messages.forEach(e => {
          if (e.lang_id == this.languageService.select.id) {
            alertify.error(e.messageLang);
          }
        })
      })
  }

}
