import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Shop} from '../Core/models/Shop';
import {MatTableDataSource} from '@angular/material/table';
import {ShopService} from '../Core/services/Admin/shop/shop.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {LanguagesService} from '../Core/services/lang/languages.service';


@Component({
  selector: 'app-shoping',
  templateUrl: './shoping.component.html',
  styleUrls: ['./shoping.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShopingComponent implements OnInit {
  constructor(public service:ShopService,private translate: TranslateService,private languageService:LanguagesService) {
    this.get()
  }
  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.get()
    });
  }

  tabs: Shop[];
  get(){
    this.service.getActive().subscribe(res=>{
      res.forEach(r=>{
        r.shopTranslates.forEach(st=>{
          if(st.languageId==this.languageService.select.id){
            r.shopTranslates[0]=st
          }
        })
      })
      this.tabs=res;
    })
  }
  bannerSrc:string="../../assets/image/banners/shop-banner.png";
}
