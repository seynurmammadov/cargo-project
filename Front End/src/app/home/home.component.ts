import { ElementRef, ViewEncapsulation} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as Parallax from 'parallax-js';
import {Country} from '../Core/models/country';
import { Office } from '../Core/models/office';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '(window:resize)': 'onResize()'
  },
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {
  constructor(private elementRef: ElementRef) {
    this.border= window.innerWidth / 2 + 160 + 'px solid transparent'
  }
  ngOnInit(): void {
    var scene = this.elementRef.nativeElement.querySelectorAll(".parallax").forEach(layer=>{
      var parallax = new Parallax(layer)
    })
    this.countries=[ {
      name:'turkey',
      value:'1',
    },]

  }
  imgSrc:string="../../assets/image/news/5f4fcff5535eb.png";

  countries:Country[]=[];
  offices:Office[]=[];
  border:string;
  onResize(){
    this.border = window.innerWidth / 2 + 160 + 'px solid transparent'
  }
}
