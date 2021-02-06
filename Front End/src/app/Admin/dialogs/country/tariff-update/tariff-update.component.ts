import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {TariffService} from '../../../../Core/services/Admin/countries/tariff/tariff.service';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
declare let alertify:any
@Component({
  selector: 'app-tariff-update',
  templateUrl: './tariff-update.component.html',
  styleUrls: ['./tariff-update.component.scss']
})
export class TariffUpdateComponent implements OnInit {
  createForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<TariffUpdateComponent>,
    private languageService:LanguagesService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private service:TariffService
  ) { }

  ngOnInit(): void {
    this.createForm= new FormGroup({
      To: new FormControl(this.data.row.to, [
        Validators.required,
      ]),
    })
  }
  public errorHandling = (control: string, error: string) => {
    return this.createForm.controls[control].hasError(error);
  }

  submit(){
    const body = new FormData();
    body.append("To",this.createForm.controls["To"].value.trim())
    body.append("id",this.data.row.id.toString())
    body.append("CountryID",this.data.countryId.toString())
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
