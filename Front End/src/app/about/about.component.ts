import { Component, OnInit } from '@angular/core';
import {LanguagesService} from '../Core/services/lang/languages.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {DescriptionsService} from '../Core/services/descriptions/descriptions.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private languagesService:LanguagesService,
              private translate: TranslateService,
              private service:DescriptionsService,) {
    this.get()
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.get()
    });
  }
  data:any
  desc:string
  get(){
    this.service.getAbout().subscribe((res)=>{
      this.data=res[0]
      if(this.languagesService.select.id==1){
        this.desc=this.data.descEng
      }
      if(this.languagesService.select.id==2){
        this.desc=this.data.descRus
      }
      if(this.languagesService.select.id==3){
        this.desc=this.data.descAz
      }
    })
  }
  bannerSrc:string="../../assets/image/banners/about-banner.jpg";
}
