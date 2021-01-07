import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {fader} from '../Animations/animation';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fader
  ]
})
export class AppComponent {
  title = 'Camex';
  prepareRoute(outlet: RouterOutlet) {

    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}

