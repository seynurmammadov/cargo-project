import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Location} from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from '../Core/services/user/user.service';
import {AppUser} from '../Admin/Models/AppUser';
import {strict} from 'assert';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {LanguagesService} from '../Core/services/lang/languages.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MyprofileComponent implements OnInit {
  user:AppUser;

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
        res.receipts.sort((x, y) => +new Date(y.createdDate) - +new Date(x.createdDate));
      this.user=res;
      this.loaded=true
    })
  }
  onSwitch(str) {
   this.location.replaceState(str);
  }
}


