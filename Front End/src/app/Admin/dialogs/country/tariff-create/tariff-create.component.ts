import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {TariffService} from '../../../../Core/services/Admin/countries/tariff/tariff.service';
declare let alertify:any
@Component({
  selector: 'app-tariff-create',
  templateUrl: './tariff-create.component.html',
  styleUrls: ['./tariff-create.component.scss']
})
export class TariffCreateComponent implements OnInit {

  createForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<TariffCreateComponent>,
    private languageService:LanguagesService,
    @Inject(MAT_DIALOG_DATA) public data:number,
    private service:TariffService
  ) { }

  ngOnInit(): void {
    this.createForm= new FormGroup({
      To: new FormControl('', [
        Validators.required,
      ]),
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
    body.append("To",this.createForm.controls["To"].value.trim())
    const PriceLists= [
      {
        Min:this.createForm.controls["Min"].value,
        Max:this.createForm.controls["Max"].value,
        Price:this.createForm.controls["Price"].value,
      }
    ]
    body.append("Prices",JSON.stringify(PriceLists))
    body.append("CountryId",this.data.toString())
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
