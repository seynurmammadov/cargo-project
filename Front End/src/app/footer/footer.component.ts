import { Component, OnInit } from '@angular/core';
import {LanguagesService} from '../Core/services/lang/languages.service';
import {DescriptionsService} from '../Core/services/descriptions/descriptions.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private languagesService:LanguagesService,
              private translate: TranslateService,
              private service:DescriptionsService,) { this.get()}

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.get()
    });
  }
  public createImgPathLogo = (serverPath: string) => {
    return `https://localhost:44387/Site/images/bio/${serverPath}`;
  }
  data:any
  desc:string
  loaded:boolean=false
  get(){
    this.service.getBio().subscribe((res)=>{
      this.data=res[0]
      if(this.languagesService.select.id==1){
        this.desc=this.data.shortDescEng
      }
      if(this.languagesService.select.id==2){
        this.desc=this.data.shortDescRus
      }
      if(this.languagesService.select.id==3){
        this.desc=this.data.shortDescAz
      }
      this.loaded=true
    })
  }
}
