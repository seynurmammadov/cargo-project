import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {fader} from '../Animations/animation';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LanguagesService} from './Core/services/lang/languages.service';
import {DescriptionsService} from './Core/services/descriptions/descriptions.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fader
  ]
})
export class AppComponent {
  data:any
  constructor(private titleService: Title,
              private languageService:LanguagesService,
              private service:DescriptionsService) {
    this.get()
  }
  prepareRoute(outlet: RouterOutlet) {

    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  get(){
    this.service.getBio().subscribe((res)=>{
      this.data=res[0]
      this.titleService.setTitle(this.data.pageTitle)
    })
  }

}

