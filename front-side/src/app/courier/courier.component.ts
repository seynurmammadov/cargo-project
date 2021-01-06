import { Component, OnInit } from '@angular/core';
import { Zones } from './models/zones';

@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.scss']
})
export class CourierComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
    this.zones=[{
      price:1,
      zoneNames:["Nefciler","Qarayev"]
    },{
      price:2,
      zoneNames:["Bayil","Qarayev"]
    }]
  }

  name:string="Courier Service"
  bannerSrc:string="../../assets/image/banners/about-banner.jpg";
  zones:Zones[]=[];
}
