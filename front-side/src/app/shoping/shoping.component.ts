import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
export interface ExampleTab {
  label: string;
  content: string;
  links:string[];
}
@Component({
  selector: 'app-shoping',
  templateUrl: './shoping.component.html',
  styleUrls: ['./shoping.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShopingComponent implements OnInit {
  constructor() {
    this.tabs =[
      {label: 'First', content: 'Content 1',links:["https://camex.az/?module=goshopping&lang=az&id=20","sdada","sdada","sdada","sdada","sdada","sdada","sdada","sdada","sdada","sdada","sdada"]},
      {label: 'dfghjskdLAKS', content: 'Content 2',links:["dsjhdfkkjask","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l"]},
      {label: 'Third', content: 'Content 3',links:["2134i21j4kl","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l"]},
      {label: 'AKSESUARLAR VƏ ÇANTALAR', content: 'Content 3',links:["2134i21j4kl","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l"]},
      {label: 'Third', content: 'Content 3',links:["2134i21j4kl","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l"]},
      {label: 'Third', content: 'Content 3',links:["2134i21j4kl","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l"]},
      {label: 'Third', content: 'Content 3',links:["2134i21j4kl","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l"]},
      {label: 'Third', content: 'Content 3',links:["2134i21j4kl","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l"]},
      {label: 'Third', content: 'Content 3',links:["2134i21j4kl","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l"]},
      {label: 'Third', content: 'Content 3',links:["2134i21j4kl","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l"]},
      {label: 'Third', content: 'Content 3',links:["2134i21j4kl","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l"]},
      {label: 'Third', content: 'Content 3',links:["2134i21j4kl","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l"]},
      {label: 'Third', content: 'Content 3',links:["2134i21j4kl","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l"]},
      {label: 'Third', content: 'Content 3',links:["2134i21j4kl","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l"]},
      {label: 'Third', content: 'Content 3',links:["2134i21j4kl","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l"]},
      {label: 'Third', content: 'Content 3',links:["2134i21j4kl","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l"]},
      {label: 'Third', content: 'Content 3',links:["2134i21j4kl","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l","fdjk2l"]},
    ]
  }
  ngOnInit(): void {
  }

  tabs: ExampleTab[]=[];
  name:string="mağazalar"
  bannerSrc:string="../../assets/image/banners/shop-banner.png";
}
