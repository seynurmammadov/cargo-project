import {Component, Input, OnInit} from '@angular/core';
import {CountriesService} from '../../Core/services/Admin/countries/countries.service';
import {CountryData} from '../../Admin/countries-all/CountryData';
import {UserVM} from '../../Core/models/UserVM';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  imgFlagUsa:string="../../assets/image/AddressFlags/usa.jpg"
  flagIcon:string="../../assets/image/AddressFlags/usa-icon.png"
  countryData:CountryData[];
  @Input() fullUser:UserVM;
  constructor(public service:CountriesService, public languageService:LanguagesService,    private translate: TranslateService, ) {
    this.get()
  }
  get() {
    this.service.getCountriesActive().subscribe(res=>{
      res.forEach(c=>{
        c.noticeTranslate.forEach(ct=>{
          if(ct.languageId==this.languageService.select.id){
            c.noticeTranslate[0]=ct
          }
        })
        c.countryAddressDescriptions.forEach(ad=>{
          if(this.fullUser.privateCustomer==null){
            var re = /@name@/gi;
            ad.description= ad.description.replace(re,this.fullUser.businessCustomer.companyName)
             re = /@surname@/gi;
            ad.description= ad.description.replace(re,"")
            re = /@id@/gi;
            ad.description= ad.description.replace(re,"A"+this.getCamexId(this.fullUser.businessCustomer.camexId))
          }
          else if(this.fullUser.businessCustomer==null){
            var re = /@name@/gi;
            ad.description= ad.description.replace(re,this.fullUser.privateCustomer.name)
            re = /@surname@/gi;
            ad.description= ad.description.replace(re,this.fullUser.privateCustomer.surname)
            re = /@id@/gi;
            ad.description= ad.description.replace(re,"A"+this.getCamexId(this.fullUser.privateCustomer.camexId))
          }
        })
      })
      this.countryData=res;
    })
  }
  getCamexId(val){
    return String(val).padStart(5, '0')
  }
  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.get()
    });
  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44387/Site/images/countries/${serverPath}`;
  }
}
