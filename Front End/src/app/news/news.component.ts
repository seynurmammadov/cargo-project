import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {News} from '../Core/models/News';
import {Flight} from '../Core/models/Flight';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {LanguagesService} from '../Core/services/lang/languages.service';
import {FlightService} from '../Core/services/Admin/flight/flight.service';
import {NewsService} from '../Core/services/Admin/news/news.service';
declare var $: any;
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewsComponent implements OnInit,AfterViewInit {
  constructor(public service:NewsService,public serviceFlight:FlightService,private translate: TranslateService,private languageService:LanguagesService) {
    this.get()
  }
  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.get()
    });
  }
  get(){
    this.service.getActive().subscribe(res=>{
      res.forEach(r=>{
        r.newsTranslates.forEach(st=>{
          if(st.languageId==this.languageService.select.id){
            r.newsTranslates[0]=st
          }
        })
      })
      this.newsArr=res;
    })
    this.serviceFlight.getActive().subscribe(res=>{
      this.flights=res
    })
  }
  ngAfterViewInit(){
    $('.owl-nav').removeClass('disabled');
  }

  customOptions: OwlOptions = {
    loop: true,
    dots: false,
    navSpeed: 700,
    autoHeight: false,
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
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44387/Site/images/news/${serverPath}`;
  }
  bannerSrc:string="../../assets/image/banners/news-banner.png";
}
