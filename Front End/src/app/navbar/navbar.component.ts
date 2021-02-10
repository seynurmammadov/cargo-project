import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { LanguagesService } from '../Core/services/lang/languages.service';
import {Languages} from './models/languages';
import {LoginService} from '../Core/services/login/login.service';
import {NavigationService} from '../Core/services/navigation/navigation.service';
import {UserNavVM} from './models/UserNavVM';
import {DescriptionsService} from '../Core/services/descriptions/descriptions.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  constructor(private languagesService:LanguagesService,
              private service:DescriptionsService,
              public authService:LoginService, private navigation:NavigationService) {
    this.languagesService.getLang().subscribe(res=>{
      res.forEach(r=>{
        r.flagSrc='../../assets/image/navbar/'+r.flagSrc
      })
      this.languages=res;
      this.select=this.languagesService.select;
    });
    this.getUser();
    this.get()
  }
  ngOnInit(): void {
  }

  languages: Languages[]=this.languagesService.languages;
  selected:string=this.languagesService.selected;
  select:Languages;
  userNav:UserNavVM;
  data:any
  get(){
    this.service.getBio().subscribe((res)=>{
      this.data=res[0]
      this.loaded2=true
    })
  }
  SetLanguage(lang){
    this.languagesService.SetLanguage(lang);
    this.select=this.languagesService.select;
  }
  logout() {
    this.authService.logout();
  }
  loaded:boolean=false
  loaded2:boolean=false
  getUser(){
    this.authService.user$.subscribe(user=> {
      if (user != null && this.authService.end) {
        this.navigation.getUser().subscribe(res=>{
          this.userNav=res;
          this.loaded=true
        })
      }
    })
  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44387/Site/images/users/${serverPath}`;
  }
  public createImgPathLogo = (serverPath: string) => {
    return `https://localhost:44387/Site/images/bio/${serverPath}`;
  }
}
