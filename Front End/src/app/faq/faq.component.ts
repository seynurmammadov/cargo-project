import { Component, OnInit } from '@angular/core';
import {FAQ} from '../Core/models/FAQ';
import {MatTableDataSource} from '@angular/material/table';
import {CourierService} from '../Core/services/Admin/courier/courier.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {LanguagesService} from '../Core/services/lang/languages.service';
import {FaqService} from '../Core/services/Admin/faq/faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqs:FAQ[]
  bannerSrc:string="../../assets/image/banners/faq-banner.png";
  constructor(private service:FaqService,private translate: TranslateService,private languageService:LanguagesService) {
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
        r.faqTranslates.forEach(st=>{
          if(st.languageId==this.languageService.select.id){
            r.faqTranslates[0]=st
          }
        })
      })
      this.faqs=res;
    })
  }

}
