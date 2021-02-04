import {Component,  OnInit,  ViewEncapsulation} from '@angular/core';
import {Location} from '@angular/common';
import {UserService} from '../Core/services/user/user.service';
import {AppUser} from '../Admin/Models/AppUser';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {LanguagesService} from '../Core/services/lang/languages.service';
import {PrivateCustomer} from '../Admin/Models/PrivateCustomer';
import {BusinessCustomer} from '../Admin/Models/BusinessCustomer';
import {UserNavVM} from '../navbar/models/UserNavVM';
import {UserVM} from '../Core/models/UserVM';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MyprofileComponent implements OnInit {
  user:AppUser;
  fullUser:UserVM
  constructor(private location: Location,private service:UserService,private translate: TranslateService, public languageService:LanguagesService) {
    this.get()
  }
  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.get()
    });
  }
  loaded:boolean=false
  get(){
    this.service.get().subscribe(res=>{
      this.loaded=true
        res.user.receipts.sort((x, y) => +new Date(y.createdDate) - +new Date(x.createdDate));
      this.user=res.user;
      this.fullUser=res;
    })
  }
  onSwitch(str) {
   this.location.replaceState(str);
  }
  statement:boolean=false
  order:boolean=false
  waiting:boolean=false
  inAnbar:boolean=false
  Ended:boolean=false
  activeStatement(){
    this.statement=true
  }
  activeEnded(){
    this.Ended=true
  }
  activeOrder(){
    this.order=true
  }
  activeWaiting(){
    this.waiting=true
  }
  activeInAnbar(){
    this.inAnbar=true
  }
}


