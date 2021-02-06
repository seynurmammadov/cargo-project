import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {FaqService} from '../../../../Core/services/Admin/faq/faq.service';
declare let alertify:any
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-faq-create',
  templateUrl: './faq-create.component.html',
  styleUrls: ['./faq-create.component.scss']
})
export class FaqCreateComponent implements OnInit {
  public Editor = ClassicEditor;
  createForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<FaqCreateComponent>,
    private languageService:LanguagesService,
    private service:FaqService
  ) { }

  ngOnInit(): void {
    this.createForm= new FormGroup({
      IsActived: new FormControl(false ),
      TitleRussia: new FormControl('', [
        Validators.required,
      ]),
      TitleEnglish: new FormControl('', [
        Validators.required,
      ]),
      TitleAzerbaijan: new FormControl('', [
        Validators.required,
      ]),
      DescRussia: new FormControl('', [
        Validators.required,
      ]),
      DescEnglish: new FormControl('', [
        Validators.required,
      ]),
      DescAzerbaijan: new FormControl('', [
        Validators.required,
      ]),
    })
  }
  public errorHandling = (control: string, error: string) => {
    return this.createForm.controls[control].hasError(error);
  }
  submit(){
    const body = new FormData();
    body.append("IsActived",this.createForm.controls["IsActived"].value)
    const CourierTranslates= [
      {
        Title:this.createForm.controls["TitleEnglish"].value.trim(),
        Description:this.createForm.controls["DescEnglish"].value.trim(),
        LanguageId:1
      },
      {
        Title:this.createForm.controls["TitleRussia"].value.trim(),
        Description:this.createForm.controls["DescRussia"].value.trim(),
        LanguageId:2
      },
      {
        Title:this.createForm.controls["TitleAzerbaijan"].value.trim(),
        Description:this.createForm.controls["DescAzerbaijan"].value.trim(),
        LanguageId:3
      }
    ]
    body.append("Translates",JSON.stringify(CourierTranslates))
    this.service.create(body).subscribe(
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
