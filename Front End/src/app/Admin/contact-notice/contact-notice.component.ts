import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {DescriptionsService} from '../../Core/services/descriptions/descriptions.service';
declare let alertify:any
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-contact-notice',
  templateUrl: './contact-notice.component.html',
  styleUrls: ['./contact-notice.component.scss']
})
export class ContactNoticeComponent implements OnInit {
  form:FormGroup
  data:any
  public Editor = ClassicEditor;
  constructor(
    private languageService:LanguagesService,
    private service:DescriptionsService
  ) {
    this.get()
  }

  ngOnInit(): void {
  }
  loaded:boolean=false
  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error);
  }
  get(){
    this.service.getContactDesc().subscribe((res)=>{
      this.data=res[0]

      this.form= new FormGroup({

        DescRus: new FormControl(this.data.descRus, [
          Validators.required,
        ]),
        DescEng: new FormControl(this.data.descEng, [
          Validators.required,
        ]),
        DescAz: new FormControl(this.data.descAz, [
          Validators.required,
        ]),
      })
      this.loaded=true

    })
  }

  submit(){
    const body = new FormData();
    body.append("DescEng",this.form.controls["DescEng"].value.trim())
    body.append("DescRus",this.form.controls["DescRus"].value.trim())
    body.append("DescAz",this.form.controls["DescAz"].value.trim())
    body.append("id",this.data.id.toString())
    this.service.updateContactDesc(body).subscribe(
      ()=> {
        alertify.success("Yeniləndi!");
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
