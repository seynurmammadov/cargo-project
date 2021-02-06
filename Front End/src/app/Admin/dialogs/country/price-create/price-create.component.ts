import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {TariffService} from '../../../../Core/services/Admin/countries/tariff/tariff.service';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {PriceService} from '../../../../Core/services/Admin/countries/tariff/price.service';
declare let alertify:any
@Component({
  selector: 'app-price-create',
  templateUrl: './price-create.component.html',
  styleUrls: ['./price-create.component.scss']
})
export class PriceCreateComponent implements OnInit {

  createForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<PriceCreateComponent>,
    private languageService:LanguagesService,
    @Inject(MAT_DIALOG_DATA) public data:number,
    private service:PriceService
  ) { }

  ngOnInit(): void {
    this.createForm= new FormGroup({
      Min: new FormControl('', [
        Validators.min(0.01),
        Validators.max(100),
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Max: new FormControl('', [
        Validators.min(0.01),
        Validators.max(100),
        Validators.pattern(/^\d*\.?\d*$/),
        RxwebValidators.greaterThan({fieldName:'Min'})
      ]),
      Price: new FormControl('', [
        Validators.min(0.01),
        Validators.max(100),
        Validators.pattern(/^\d*\.?\d*$/)
      ])
    })
  }
  public errorHandling = (control: string, error: string) => {
    return this.createForm.controls[control].hasError(error);
  }

  submit(){
    const body = new FormData();
    body.append("Min",this.createForm.controls["Min"].value)
    body.append("Max",this.createForm.controls["Max"].value)
    body.append("Price",this.createForm.controls["Price"].value)
    body.append("TariffId",this.data.toString())
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
