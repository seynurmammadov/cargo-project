import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss']
})
export class MobileNavbarComponent implements OnInit {

  constructor() { }
  mode= new FormControl('over')
  ngOnInit(): void {
  }

}
