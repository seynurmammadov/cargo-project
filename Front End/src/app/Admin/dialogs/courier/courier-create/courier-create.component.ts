import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {CourierService} from '../../../../Core/services/Admin/courier/courier.service';
declare let alertify:any
@Component({
  selector: 'app-courier-create',
  templateUrl: './courier-create.component.html',
  styleUrls: ['./courier-create.component.scss']
})
export class CourierCreateComponent implements OnInit {

  createForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<CourierCreateComponent>,
    private languageService:LanguagesService,
    private service:CourierService
  ) { }

  ngOnInit(): void {
    this.createForm= new FormGroup({
      Price: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      IsActived: new FormControl(false ),
      NameRussia: new FormControl('', [
        Validators.required,
      ]),
      NameEnglish: new FormControl('', [
        Validators.required,
      ]),
      NameAzerbaijan: new FormControl('', [
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
    body.append("Price",this.createForm.controls["Price"].value)
    const CourierTranslates= [
      {
        Name:this.createForm.controls["NameEnglish"].value.trim(),
        LanguageId:1
      },
      {
        Name:this.createForm.controls["NameRussia"].value.trim(),
        LanguageId:2
      },
      {
        Name:this.createForm.controls["NameAzerbaijan"].value.trim(),
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
