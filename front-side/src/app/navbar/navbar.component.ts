import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { LanguagesService } from '../services/languages.service';
import {Languages} from './models/languages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  constructor(private languagesService:LanguagesService) {
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
}
