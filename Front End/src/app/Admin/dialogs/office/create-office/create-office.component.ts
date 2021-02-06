import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import { OfficeService } from 'src/app/Core/services/Admin/office/office.service';
declare let alertify:any;
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-create-office',
  templateUrl: './create-office.component.html',
  styleUrls: ['./create-office.component.scss']
})
export class CreateOfficeComponent implements OnInit {

  createForm:FormGroup
  public Editor = ClassicEditor
  constructor(
    public dialogRef: MatDialogRef<CreateOfficeComponent>,
    private languageService:LanguagesService,
    private service:OfficeService
  ) { }

  ngOnInit(): void {
    this.createForm= new FormGroup({

      NameRussia: new FormControl('', [
        Validators.required,
      ]),
      NameEnglish: new FormControl('', [
        Validators.required,
      ]),
      NameAzerbaijan: new FormControl('', [
        Validators.required,
      ]),
      PriceValue: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      PhoneNumber: new FormControl('994', [
        Validators.required,
      ]),
      Url: new FormControl('', [
        Validators.required,
      ]),
      Email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      Email2: new FormControl('', [
        Validators.email,
      ]),
      AddressRussia: new FormControl('', [
        Validators.required,
      ]),
      AddressEnglish: new FormControl('', [
        Validators.required,
      ]),
      AddressAzerbaijan: new FormControl('', [
        Validators.required,
      ]),
      WorkTimeRussia: new FormControl('', [
        Validators.required,
      ]),
      WorkTimeEnglish: new FormControl('', [
        Validators.required,
      ]),
      WorkTimeAzerbaijan: new FormControl('', [
        Validators.required,
      ]),
      IsActived: new FormControl(false ),
    })
  }
  public errorHandling = (control: string, error: string) => {
    return this.createForm.controls[control].hasError(error);
  }

  submit(){
    const body = {
      PriceValue:this.createForm.controls["PriceValue"].value,
      PhoneNumber:this.createForm.controls["PhoneNumber"].value,
      Email:this.createForm.controls["Email"].value,
      Email2:this.createForm.controls["Email2"].value,
      IsActived:this.createForm.controls["IsActived"].value,
      Url:this.createForm.controls["Url"].value,
      OfficeNameTranlates: [
        {
          name:this.createForm.controls["NameEnglish"].value.trim(),
          address:this.createForm.controls["AddressEnglish"].value.trim(),
          workTime:this.createForm.controls["WorkTimeEnglish"].value,
          languageId:1
        },
        {
          name:this.createForm.controls["NameRussia"].value.trim(),
          address:this.createForm.controls["AddressRussia"].value.trim(),
          workTime:this.createForm.controls["WorkTimeRussia"].value,
          languageId:2
        },
        {
          name:this.createForm.controls["NameAzerbaijan"].value.trim(),
          address:this.createForm.controls["AddressAzerbaijan"].value.trim(),
          workTime:this.createForm.controls["WorkTimeAzerbaijan"].value,
          languageId:3
        }
      ],
    }
    this.service.createOffice(body).subscribe(
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
