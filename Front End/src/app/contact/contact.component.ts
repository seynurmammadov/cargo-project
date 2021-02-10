import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Office} from '../Core/models/Office';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {LanguagesService} from '../Core/services/lang/languages.service';
import {OfficeService} from '../Core/services/Admin/office/office.service';
import {MessageService} from '../Core/services/message/message.service';
import {DescriptionsService} from '../Core/services/descriptions/descriptions.service';
declare let alertify:any
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ContactComponent implements OnInit {
  bannerSrc:string="../../assets/image/banners/contact-banner.png";
  offices:Office[];
  form:FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(private service:OfficeService,
              private serviceContact:DescriptionsService,
              private serviceMessage:MessageService,private translate: TranslateService,private languageService:LanguagesService) {
    this.form= new FormGroup({
      FullName: new FormControl(
        '', [
          Validators.required
        ]
      ),
      Email : new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      PhoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      CamexId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Description: new FormControl('', [
        Validators.required,
      ]),

    })

    this.get()
  }
  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.get()
    });
  }
  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error);
  }
  get PhoneNumber() {
    return this.form.get('PhoneNumber');
  }
  data:any
  desc:string
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
    this.serviceContact.getContactDesc().subscribe((res)=>{
      this.data=res[0]
      if(this.languageService.select.id==1){
        this.desc=this.data.descEng
      }
      if(this.languageService.select.id==2){
        this.desc=this.data.descRus
      }
      if(this.languageService.select.id==3){
        this.desc=this.data.descAz
      }
    })
  }
  reset(){
  }
  submit() {
    const body = new FormData();
    body.append("Fullname",this.form.controls["FullName"].value)
    body.append("Email",this.form.controls["Email"].value)
    body.append("PhoneNumber",this.form.controls["PhoneNumber"].value)
    body.append("CamexId",this.form.controls["CamexId"].value)
    body.append("Message",this.form.controls["Description"].value)

    this.serviceMessage.create(body).subscribe(
      ()=> {
        alertify.success(this.translate.instant("sended"));
        setTimeout(() => this.formGroupDirective.resetForm(), 0)
      },
      error => {
        error.error.messages.forEach(e => {
          if (e.lang_id == this.languageService.select.id) {
            alertify.error(e.messageLang);
          }
        })
      }
    )

  }
}
