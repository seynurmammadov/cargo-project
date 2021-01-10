import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Country} from '../home/models/country';
import {Office} from '../home/models/office';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalculatorComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
    this.countries=[ {
      name:'turkey',
      value:'1',
    },]
    this.offices=[ {
      name:'Nefciler',
      value:'1',
    },]
  }

  countries:Country[]=[];
  offices:Office[]=[];
  name:string="Calculator"
  bannerSrc:string="../../assets/image/banners/calculators-banner.jpg";
}
