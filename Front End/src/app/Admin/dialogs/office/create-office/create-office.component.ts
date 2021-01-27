import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import { OfficeService } from 'src/app/Core/services/Admin/office/office.service';
declare let alertify:any;
@Component({
  selector: 'app-create-office',
  templateUrl: './create-office.component.html',
  styleUrls: ['./create-office.component.scss']
})
export class CreateOfficeComponent implements OnInit {

  createForm:FormGroup
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
      IsActived: new FormControl(false ),
    })
  }
  public errorHandling = (control: string, error: string) => {
    return this.createForm.controls[control].hasError(error);
  }

  submit(){
    const body = {
      PriceValue:this.createForm.controls["PriceValue"].value,
      IsActived:this.createForm.controls["IsActived"].value,
      OfficeNameTranlates: [
        {
          name:this.createForm.controls["NameEnglish"].value.trim(),
          languageId:1
        },
        {
          name:this.createForm.controls["NameRussia"].value.trim(),
          languageId:2
        },
        {
          name:this.createForm.controls["NameAzerbaijan"].value.trim(),
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
