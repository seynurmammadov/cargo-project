import {Component, ElementRef, OnInit} from '@angular/core';
import {LanguagesService} from '../services/languages.service';
import {Languages} from '../navbar/models/languages';
import * as $ from 'jquery';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss']
})
export class MobileNavbarComponent implements OnInit {

  constructor(private languagesService:LanguagesService, private elementRef: ElementRef) {
  }
  ngOnInit(): void {
  }

  languages: Languages[]=this.languagesService.languages;
  selected:string=this.languagesService.selected;
  select:Languages=this.languagesService.select;

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
