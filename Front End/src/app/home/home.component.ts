import { ElementRef, ViewEncapsulation} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as Parallax from 'parallax-js';
import {Office} from '../Core/models/Office';
import {Country} from '../Core/models/Country';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CountriesService} from '../Core/services/Admin/countries/countries.service';
import {OfficeService} from '../Core/services/Admin/office/office.service';
import {LanguagesService} from '../Core/services/lang/languages.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {CountryData} from '../Admin/countries-all/CountryData';
import {NewsService} from '../Core/services/Admin/news/news.service';
import {News} from '../Core/models/News';

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
  countries:CountryData[]
  offices:Office[]
  total=0;
  newsArr:News[]=[];
  Form:FormGroup
  imgSrc:string="../../assets/image/news/5f4fcff5535eb.png";
  border:string;
  constructor(private elementRef: ElementRef,private serviceCountry:CountriesService,private serviceOffice:OfficeService,
              private languageService:LanguagesService,
              public serviceNews:NewsService,
              private translate: TranslateService,) {
    this.border= window.innerWidth / 2 + 160 + 'px solid transparent'
    this.Form= new FormGroup({
      Country: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Office: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      LenghtUnit: new FormControl('', [
        Validators.required,
      ]),
      WeightUnit: new FormControl('', [
        Validators.required,
      ]),
      Height: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Width: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Weight: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Lenght: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),

    })
  }
  ngOnInit(): void {
    var scene = this.elementRef.nativeElement.querySelectorAll(".parallax").forEach(layer=>{
      var parallax = new Parallax(layer)
    })
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.get()
    });
    this.get()
  }
  loaded:boolean=false
  get(){
    this.serviceCountry.getWithTariffs().subscribe((res)=>{
      this.countries=res;
    })
    this.serviceOffice.getOffices().subscribe((res)=>{
      res.forEach(o=>{
        o.officeNameTranlates.forEach(of=>{
          if(of.languageId==this.languageService.select.id){
            o.officeNameTranlates[0]=of;
            this.offices=res;
          }
        })
      })
      this.offices=res;
    })
    this.serviceNews.getActive().subscribe(res=>{
      res.forEach(r=>{
        r.newsTranslates.forEach(st=>{
          if(st.languageId==this.languageService.select.id){
            r.newsTranslates[0]=st
          }
        })
      })
      this.newsArr=res;
      this.loaded=true
    })
    this.newsArr.reverse();
  }

  onResize(){
    this.border = window.innerWidth / 2 + 160 + 'px solid transparent'
  }
  calc(){
    let cm = 100;
    let price=0;
    let offVal= this.offices.find(o=>o.id==this.Form.controls["Office"].value).priceValue
    let prices = this.countries.find(c=>c.id==this.Form.controls["Country"].value).tariff.find(t=>t.to=="Baku").priceLists
    let length = this.Form.controls["Lenght"].value*this.Form.controls["LenghtUnit"].value;
    let width  = this.Form.controls["Width"].value*this.Form.controls["LenghtUnit"].value;
    let height  = this.Form.controls["Height"].value*this.Form.controls["LenghtUnit"].value;
    let weight = this.Form.controls["Weight"].value*this.Form.controls["WeightUnit"].value;
    let weightResult = (length > cm || width > cm || height > cm) ? this.dimensionalWeight(width, length, height, weight) : weight;
    if(weightResult !=0){
      for (let i=0; i<prices.length;i++)
      {
        if(prices[i].max==100){
          price=prices[i].price
          price+=offVal
          this.total = parseFloat((price* weightResult).toFixed(2));
          break
        }
        if( prices[i].max>weightResult ){
          price=prices[i].price
          price+=offVal
          this.total=parseFloat(price.toFixed(2))
          break
        }
      }
    }
    else {
      this.total = parseFloat(price.toFixed(2));
    }
  }
  dimensionalWeight(width, length, height, weight) {
    let dimensionalWeight = ((width * length * height) / 6000).toFixed(2);
    if (parseFloat(dimensionalWeight) > parseFloat(weight)) {
      return dimensionalWeight;
    } else {
      return weight;
    }
  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44387/Site/images/news/${serverPath}`;
  }

}
