import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Languages} from './models/languages';
import {TranslateService} from '@ngx-translate/core';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  languages: Languages[]=[];

  selected:string=localStorage.getItem("language");
  select:Languages;
  constructor( public translate: TranslateService) {
    translate.addLangs(['az','ru','en']);
    if(this.selected==null || this.selected=='' ||this.languages.find(x=>x.value==this.selected)==undefined){
      this.selected='az';
      this.SetLanguage('az');
      translate.setDefaultLang(this.selected);
    }
    else{
      translate.setDefaultLang(this.selected);
    }

  }

  ngOnInit(): void {
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
    this.select=this.languages.find(l=>l.value==this.selected)
  }

  SetLanguage(lang):void{
    localStorage.setItem("language",lang);
    this.select=this.languages.find(x=>x.value==lang);
    this.translate.use(lang);
  }
}
