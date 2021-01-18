import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { LanguagesService } from '../Core/services/Lang/languages.service';
import {Languages} from './models/languages';
import {LoginService} from '../Core/services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  constructor(private languagesService:LanguagesService, public authService:LoginService) {
    this.languagesService.getLang().subscribe(res=>{
      res.forEach(r=>{
        r.flagSrc='../../assets/image/navbar/'+r.flagSrc
      })
      this.languages=res;
      this.select=this.languagesService.select;
    });
  }
  ngOnInit(): void {
  }

  languages: Languages[]=this.languagesService.languages;
  selected:string=this.languagesService.selected;
  select:Languages;

  SetLanguage(lang){
    this.languagesService.SetLanguage(lang);
    this.select=this.languagesService.select;
  }
  logout() {
    this.authService.logout();
  }
}
