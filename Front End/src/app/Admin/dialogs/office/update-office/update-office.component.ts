import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {OfficeService} from '../../../../Core/services/Admin/office/office.service';
declare let alertify:any;
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-update-office',
  templateUrl: './update-office.component.html',
  styleUrls: ['./update-office.component.scss']
})
export class UpdateOfficeComponent implements OnInit {
  UpdateForm:FormGroup
  public Editor = ClassicEditor
  constructor(
    public dialogRef: MatDialogRef<UpdateOfficeComponent>,
    private languageService:LanguagesService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private service:OfficeService
  ) { }

  ngOnInit(): void {
    this.UpdateForm= new FormGroup({

      NameEnglish: new FormControl(this.data.row.officeNameTranlates[0].name, [
        Validators.required,
      ]),
      NameRussia: new FormControl(this.data.row.officeNameTranlates[1].name, [
        Validators.required,
      ]),
      NameAzerbaijan: new FormControl(this.data.row.officeNameTranlates[2].name, [
        Validators.required,
      ]),
      PriceValue: new FormControl(this.data.row.priceValue, [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      PhoneNumber: new FormControl(this.data.row.phoneNumber, [
        Validators.required,
      ]),
      Url: new FormControl(this.data.row.url, [
        Validators.required,
      ]),
      Email: new FormControl(this.data.row.email, [
        Validators.required,
        Validators.email,
      ]),
      Email2: new FormControl(this.data.row.email2, [
        Validators.email,
      ]),
      AddressRussia: new FormControl(this.data.row.officeNameTranlates[1].address, [
        Validators.required,
      ]),
      AddressEnglish: new FormControl(this.data.row.officeNameTranlates[0].address, [
        Validators.required,
      ]),
      AddressAzerbaijan: new FormControl(this.data.row.officeNameTranlates[2].address, [
        Validators.required,
      ]),
      WorkTimeRussia: new FormControl(this.data.row.officeNameTranlates[1].workTime, [
        Validators.required,
      ]),
      WorkTimeEnglish: new FormControl(this.data.row.officeNameTranlates[0].workTime, [
        Validators.required,
      ]),
      WorkTimeAzerbaijan: new FormControl(this.data.row.officeNameTranlates[2].workTime, [
        Validators.required,
      ]),
      IsActived: new FormControl(this.data.row.isActived ),
    })
  }
  public errorHandling = (control: string, error: string) => {
    return this.UpdateForm.controls[control].hasError(error);
  }

  submit(){
    const body = {
      id:this.data.row.id,
      PriceValue:this.UpdateForm.controls["PriceValue"].value,
      Url:this.UpdateForm.controls["Url"].value,
      IsActived:this.UpdateForm.controls["IsActived"].value,
      PhoneNumber:this.UpdateForm.controls["PhoneNumber"].value,
      Email:this.UpdateForm.controls["Email"].value,
      Email2:this.UpdateForm.controls["Email2"].value,
      OfficeNameTranlates: [
        {
          id:this.data.row.officeNameTranlates[0].id,
          name:this.UpdateForm.controls["NameEnglish"].value.trim(),
          address:this.UpdateForm.controls["AddressEnglish"].value.trim(),
          workTime:this.UpdateForm.controls["WorkTimeEnglish"].value,
          languageId:1
        },
        {
          id:this.data.row.officeNameTranlates[1].id,
          name:this.UpdateForm.controls["NameRussia"].value.trim(),
          address:this.UpdateForm.controls["AddressRussia"].value.trim(),
          workTime:this.UpdateForm.controls["WorkTimeRussia"].value,
          languageId:2
        },
        {
          id:this.data.row.officeNameTranlates[2].id,
          name:this.UpdateForm.controls["NameAzerbaijan"].value.trim(),
          address:this.UpdateForm.controls["AddressAzerbaijan"].value.trim(),
          workTime:this.UpdateForm.controls["WorkTimeAzerbaijan"].value,
          languageId:3
        }
      ],
    }
    this.service.updateOffice(body).subscribe(
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
