import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {CityService} from '../../../../Core/services/Admin/city/city.service';
declare let alertify:any
@Component({
  selector: 'app-update-city',
  templateUrl: './update-city.component.html',
  styleUrls: ['./update-city.component.scss']
})
export class UpdateCityComponent implements OnInit {

  UpdateForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<UpdateCityComponent>,
    private languageService:LanguagesService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private service:CityService
  ) { }

  ngOnInit(): void {
    this.UpdateForm= new FormGroup({

      NameEnglish: new FormControl(this.data.row.cityNameTranslates[0].name, [
        Validators.required,
      ]),
      NameRussia: new FormControl(this.data.row.cityNameTranslates[1].name, [
        Validators.required,
      ]),
      NameAzerbaijan: new FormControl(this.data.row.cityNameTranslates[2].name, [
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
      IsActived:this.UpdateForm.controls["IsActived"].value,
      CityNameTranslates: [
        {
          id:this.data.row.cityNameTranslates[0].id,
          name:this.UpdateForm.controls["NameEnglish"].value.trim(),
          languageId:1
        },
        {
          id:this.data.row.cityNameTranslates[1].id,
          name:this.UpdateForm.controls["NameRussia"].value.trim(),
          languageId:2
        },
        {
          id:this.data.row.cityNameTranslates[2].id,
          name:this.UpdateForm.controls["NameAzerbaijan"].value.trim(),
          languageId:3
        }
      ],
    }
    this.service.updateCity(body).subscribe(
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
