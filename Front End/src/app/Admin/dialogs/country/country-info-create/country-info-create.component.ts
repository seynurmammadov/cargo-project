import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {CountryInfoService} from '../../../../Core/services/Admin/countries/country-info.service';
declare let alertify:any
@Component({
  selector: 'app-country-info-create',
  templateUrl: './country-info-create.component.html',
  styleUrls: ['./country-info-create.component.scss']
})
export class CountryInfoCreateComponent implements OnInit {

  createForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<CountryInfoCreateComponent>,
    private languageService:LanguagesService,
    @Inject(MAT_DIALOG_DATA) public data:number,
    private service:CountryInfoService
  ) { }

  ngOnInit(): void {
    this.createForm= new FormGroup({
      Title: new FormControl('', [
        Validators.required,
      ]),
      Description: new FormControl('', [
        Validators.required,
      ]),
    })
  }
  public errorHandling = (control: string, error: string) => {
    return this.createForm.controls[control].hasError(error);
  }

  submit(){
    const body = new FormData();
    body.append("Title",this.createForm.controls["Title"].value.trim())
    body.append("Description",this.createForm.controls["Description"].value.trim())
    body.append("CountryId",this.data.toString())
    this.service.createCountryInfo(body).subscribe(
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
