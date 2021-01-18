import {Component, OnInit} from '@angular/core';
import {LanguagesService} from '../Core/services/Lang/languages.service';
import {Languages} from '../navbar/models/languages';
import * as $ from 'jquery';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss']
})
export class MobileNavbarComponent implements OnInit {
  constructor(private languagesService:LanguagesService) {
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
  select:Languages;

  SetLanguage(lang){
    this.languagesService.SetLanguage(lang);
    this.select=this.languagesService.select;
  }


  hideScroll(){
    $('body').css('overflow','hidden')
  }
  showScroll(){
    $('body').css('overflow','visible')
  }

}
