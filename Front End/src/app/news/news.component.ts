import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Flight } from './models/flight';
import {News} from './models/news';
declare var $: any;
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewsComponent implements OnInit,AfterViewInit {
  constructor() {
    this.newsArr=[{
      title:"Some Titleeeeeeeeeeeeeeeee6",
      description:"Some DESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSssss",
      newsImgSrc:"../../assets/image/news/5f4fcff5535eb.png"
    },
      {
        title:"Some Titleeeeeeeeeeeeeeeee6",
        description:"Some DESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSssss",
        newsImgSrc:"../../assets/image/news/5f4fcff5535eb.png"
      },{
        title:"Some Titleeeeeeeeeeeeeeeee6",
        description:"Some DESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSssss",
        newsImgSrc:"../../assets/image/news/5f4fcff5535eb.png"
      },{
        title:"Some Titleeeeeeeeeeeeeeeee6",
        description:"Some DESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSssss",
        newsImgSrc:"../../assets/image/news/5f4fcff5535eb.png"
      }];
    this.flights=[{
      landingTime:"13.12.2020",
      flightFrom:"ankara",
      flightTo:"baku"
    },{
      landingTime:"13.12.2020",
      flightFrom:"ankara",
      flightTo:"baku"
    },{
      landingTime:"13.12.2020",
      flightFrom:"ankara",
      flightTo:"baku"
    },{
      landingTime:"13.12.2020",
      flightFrom:"ankara",
      flightTo:"baku"
    },{
      landingTime:"13.12.2020",
      flightFrom:"ankara",
      flightTo:"baku"
    }]
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(){
    $('.owl-nav').removeClass('disabled');
  }

  customOptions: OwlOptions = {
    loop: true,
    dots: false,
    navSpeed: 700,
    nav: true,
    navText: [ '<i class="fas fa-arrow-left"></i>','<i class="fas fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      440: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
  }

  newsArr:News[]=[];
  flights:Flight[]=[];
  name:string="News"
  bannerSrc:string="../../assets/image/banners/news-banner.png";
}
