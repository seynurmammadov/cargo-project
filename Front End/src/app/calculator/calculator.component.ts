import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Office} from '../Core/models/Office';
import {CountriesService} from '../Core/services/Admin/countries/countries.service';
import {OfficeService} from '../Core/services/Admin/office/office.service';
import {CountryData} from '../Admin/countries-all/CountryData';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LanguagesService} from '../Core/services/lang/languages.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalculatorComponent implements OnInit {
  countries:CountryData[]
  offices:Office[]
  total=0;
  bannerSrc:string="../../assets/image/banners/calculators-banner.jpg";
  Form:FormGroup
  constructor(private serviceCountry:CountriesService,private serviceOffice:OfficeService,
              private languageService:LanguagesService,
              private translate: TranslateService,) {
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
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.get()
    });
    this.get()
  }
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

}
