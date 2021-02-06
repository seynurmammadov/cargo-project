import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {CourierService} from '../../../../Core/services/Admin/courier/courier.service';
import {CourierLocation} from '../../../../Core/models/CourierLocation';
declare let alertify:any
@Component({
  selector: 'app-courier-update',
  templateUrl: './courier-update.component.html',
  styleUrls: ['./courier-update.component.scss']
})
export class CourierUpdateComponent implements OnInit {


  createForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<CourierUpdateComponent>,
    private languageService:LanguagesService,
    private service:CourierService,
    @Inject(MAT_DIALOG_DATA) public data:CourierLocation
  ) { }

  ngOnInit(): void {
    this.createForm= new FormGroup({
      Price: new FormControl(this.data.price, [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      IsActived: new FormControl(this.data.isActived ),
      NameRussia: new FormControl(this.data.courierTranslates[1].name, [
        Validators.required,
      ]),
      NameEnglish: new FormControl(this.data.courierTranslates[0].name, [
        Validators.required,
      ]),
      NameAzerbaijan: new FormControl(this.data.courierTranslates[2].name, [
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
    body.append("id",this.data.id.toString())

    const CourierTranslates= [
      {
        Id:this.data.courierTranslates[1].id,
        Name:this.createForm.controls["NameRussia"].value.trim(),
        LanguageId:2
      },
      {
        Id:this.data.courierTranslates[0].id,
        Name:this.createForm.controls["NameEnglish"].value.trim(),
        LanguageId:1
      },
      {
        Id:this.data.courierTranslates[2].id,
        Name:this.createForm.controls["NameAzerbaijan"].value.trim(),
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
