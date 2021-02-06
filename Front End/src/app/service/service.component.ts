import { Component, OnInit } from '@angular/core';
import {Service} from '../Core/models/Service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {LanguagesService} from '../Core/services/lang/languages.service';
import {Shop} from '../Core/models/Shop';
import {ServiceService} from '../Core/services/Admin/service/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  services:Service[]=[]

  bannerSrc:string="../../assets/image/banners/service-banner.jpg";
  constructor(public service:ServiceService,private translate: TranslateService,private languageService:LanguagesService) {
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
        r.serviceTranslates.forEach(st=>{
          if(st.languageId==this.languageService.select.id){
            r.serviceTranslates[0]=st
          }
        })
      })
      this.services=res;
    })
  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44387/Site/images/serviceIcon/${serverPath}`;
  }
}
