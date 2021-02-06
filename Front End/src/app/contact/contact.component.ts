import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Office} from '../Core/models/Office';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {LanguagesService} from '../Core/services/lang/languages.service';
import {OfficeService} from '../Core/services/Admin/office/office.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ContactComponent implements OnInit {
  bannerSrc:string="../../assets/image/banners/contact-banner.png";
  offices:Office[];
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  constructor(private service:OfficeService,private translate: TranslateService,private languageService:LanguagesService) {
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
        r.officeNameTranlates.forEach(st=>{
          if(st.languageId==this.languageService.select.id){
            r.officeNameTranlates[0]=st
          }
        })
      })
      this.offices=res;
    })
  }

}
