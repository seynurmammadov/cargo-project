import { Component, OnInit } from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {CourierService} from '../Core/services/Admin/courier/courier.service';
import {LanguagesService} from '../Core/services/lang/languages.service';
import {CourierLocation} from '../Core/models/CourierLocation';

@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.scss']
})
export class CourierComponent implements OnInit {
  courierData:CourierLocation[]
  constructor(private service:CourierService,private translate: TranslateService,private languageService:LanguagesService) {
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
        r.courierTranslates.forEach(st=>{
          if(st.languageId==this.languageService.select.id){
            r.courierTranslates[0]=st
          }
        })
      })
      this.courierData=res;
    })
  }
  bannerSrc:string="../../assets/image/banners/about-banner.jpg";

}
