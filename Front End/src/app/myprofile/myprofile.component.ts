import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MyprofileComponent implements OnInit {

  constructor(private location: Location) {
  }
  ngOnInit(): void {
  }

  onSwitch(str) {
   this.location.replaceState(str);
  }


}


