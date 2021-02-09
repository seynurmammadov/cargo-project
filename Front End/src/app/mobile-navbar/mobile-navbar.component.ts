import {Component, OnInit} from '@angular/core';
import {Languages} from '../navbar/models/languages';
declare let $:any
import {LanguagesService} from '../Core/services/lang/languages.service';
import {LoginService} from '../Core/services/login/login.service';
import {NavigationService} from '../Core/services/navigation/navigation.service';
import {UserNavVM} from '../navbar/models/UserNavVM';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss']
})
export class MobileNavbarComponent implements OnInit {
  constructor(private languagesService:LanguagesService,public authService:LoginService,private navigation:NavigationService) {
    this.languagesService.getLang().subscribe(res=>{
      res.forEach(r=>{
        r.flagSrc='../../assets/image/navbar/'+r.flagSrc
      })
      this.languages=res;
      this.select=this.languagesService.select;
    });
    this.getUser()
  }
  ngOnInit(): void {
  }
  languages: Languages[]=this.languagesService.languages;
  select:Languages;

  SetLanguage(lang){
    this.languagesService.SetLanguage(lang);
    this.select=this.languagesService.select;
  }
  loaded:boolean=false
  userNav:UserNavVM;
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

  hideScroll(){
    $('body').css('overflow','hidden')
  }
  showScroll(){
    $('body').css('overflow','visible')
  }
  logout() {
    this.authService.logout();
  }
}
