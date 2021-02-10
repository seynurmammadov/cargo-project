import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {FaqService} from '../../../../Core/services/Admin/faq/faq.service';
declare let alertify:any
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FAQ} from '../../../../Core/models/FAQ';
@Component({
  selector: 'app-faq-update',
  templateUrl: './faq-update.component.html',
  styleUrls: ['./faq-update.component.scss']
})
export class FaqUpdateComponent implements OnInit {

  public Editor = ClassicEditor;
  createForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<FaqUpdateComponent>,
    private languageService:LanguagesService,
    private service:FaqService,
    @Inject(MAT_DIALOG_DATA) public data:FAQ
  ) { }

  ngOnInit(): void {
    this.createForm= new FormGroup({
      IsActived: new FormControl(this.data.isActived ),
      TitleRussia: new FormControl(this.data.faqTranslates[1].title, [
        Validators.required,
      ]),
      TitleEnglish: new FormControl(this.data.faqTranslates[0].title, [
        Validators.required,
      ]),
      TitleAzerbaijan: new FormControl(this.data.faqTranslates[2].title, [
        Validators.required,
      ]),
      DescRussia: new FormControl(this.data.faqTranslates[1].description, [
        Validators.required,
      ]),
      DescEnglish: new FormControl(this.data.faqTranslates[0].description, [
        Validators.required,
      ]),
      DescAzerbaijan: new FormControl(this.data.faqTranslates[2].description, [
        Validators.required,
      ]),
    })
  }
  public errorHandling = (control: string, error: string) => {
    return this.createForm.controls[control].hasError(error);
  }
  submit(){
    const body = new FormData();
    body.append("id",this.data.id.toString())
    body.append("IsActived",this.createForm.controls["IsActived"].value)
    const CourierTranslates= [
      {
        Id:this.data.faqTranslates[0].id,
        Title:this.createForm.controls["TitleEnglish"].value.trim(),
        Description:this.createForm.controls["DescEnglish"].value.trim(),
        LanguageId:1
      },
      {
        Id:this.data.faqTranslates[1].id,
        Title:this.createForm.controls["TitleRussia"].value.trim(),
        Description:this.createForm.controls["DescRussia"].value.trim(),
        LanguageId:2
      },
      {
        Id:this.data.faqTranslates[2].id,
        Title:this.createForm.controls["TitleAzerbaijan"].value.trim(),
        Description:this.createForm.controls["DescAzerbaijan"].value.trim(),
        LanguageId:3
      }
    ]
    body.append("Translates",JSON.stringify(CourierTranslates))
    this.service.update(body).subscribe(
      ()=> {
        this.dialogRef.close();
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
