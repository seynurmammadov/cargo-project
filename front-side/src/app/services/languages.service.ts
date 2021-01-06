import { Injectable } from '@angular/core';
import {Languages} from '../navbar/models/languages';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  constructor( public translate: TranslateService) {
    this.languages=[
      {
        name:'English (EN)',
        value:'en',
        img:'../../assets/image/navbar/en.svg'
      },
      {
        name:'Azərbaycan (AZ)',
        value:'az',
        img:'../../assets/image/navbar/az.svg'
      },
      {
        name:'Русский (RU)',
        value:'ru',
        img:'../../assets/image/navbar/ru.svg'
      }
    ]
    translate.addLangs(['az','ru','en']);
    if(this.selected==null || this.selected=="" ||this.languages.find(x=>x.value==this.selected)==undefined){
      this.selected='az';
      this.SetLanguage('az');
      translate.setDefaultLang(this.selected);
    }
    else{
      translate.setDefaultLang(this.selected);
    }

    this.select=this.languages.find(l=>l.value==this.selected)
  }
  languages: Languages[]=[];
  selected:string=localStorage.getItem("language");
  select:Languages;
  SetLanguage(lang):void{
    localStorage.setItem("language",lang);
    this.select=this.languages.find(x=>x.value==lang);
    this.translate.use(lang);
  }
}
