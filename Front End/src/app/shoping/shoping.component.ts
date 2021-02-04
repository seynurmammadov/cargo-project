import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Shop} from '../Core/models/Shop';


@Component({
  selector: 'app-shoping',
  templateUrl: './shoping.component.html',
  styleUrls: ['./shoping.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShopingComponent implements OnInit {
  constructor() {
  }
  ngOnInit(): void {
  }

  tabs: Shop[];

  name:string="mağazalar"
  bannerSrc:string="../../assets/image/banners/shop-banner.png";
}
