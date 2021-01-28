import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {CityService} from '../../../../Core/services/Admin/city/city.service';
declare let alertify:any;
@Component({
  selector: 'app-create-city',
  templateUrl: './create-city.component.html',
  styleUrls: ['./create-city.component.scss']
})
export class CreateCityComponent implements OnInit {

  createForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<CreateCityComponent>,
    private languageService:LanguagesService,
    private service:CityService
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
      IsActived: new FormControl(false ),
    })
  }
  public errorHandling = (control: string, error: string) => {
    return this.createForm.controls[control].hasError(error);
  }

  submit(){
    const body = {
      IsActived:this.createForm.controls["IsActived"].value,
      CityNameTranslates: [
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
    this.service.createCity(body).subscribe(
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
