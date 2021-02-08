import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../Core/services/Admin/news/news.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {LanguagesService} from '../Core/services/lang/languages.service';
import {News} from '../Core/models/News';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  id:number;
  news:News
  constructor(private activatedRoute:ActivatedRoute, private service:NewsService,private translate: TranslateService,private languageService:LanguagesService) {
    this.activatedRoute.params.subscribe(param=>{
      this.id=param.id
    })
    this.get()
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.get()
    });
  }
  get(){
    this.service.getActiveWithId(this.id).subscribe(res=>{
      res.newsTranslates.forEach(st=>{
          if(st.languageId==this.languageService.select.id){
            res.newsTranslates[0]=st
          }
        })
      this.news=res;
    })
  }

  bannerSrc:string="../../assets/image/banners/news-banner.png";
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44387/Site/images/news/${serverPath}`;
  }
}
