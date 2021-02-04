import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../Core/models/Product';
import {CountryData} from '../../countries-all/CountryData';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../Core/services/lang/languages.service';
import {ProductService} from '../../../Core/services/Admin/product/product.service';
import {CountriesService} from '../../../Core/services/Admin/countries/countries.service';
import {CargoService} from '../../../Core/services/cargo/cargo.service';
declare let alertify:any
@Component({
  selector: 'app-add-statement-to-anbar',
  templateUrl: './add-statement-to-anbar.component.html',
  styleUrls: ['./add-statement-to-anbar.component.scss']
})
export class AddStatementToAnbarComponent implements OnInit {

  statementForm:FormGroup
  products:Product[];
  wallet:CountryData[];

  constructor( public dialogRef: MatDialogRef<AddStatementToAnbarComponent>,
               private languageService:LanguagesService,
               private service:CargoService,
               private proService:ProductService,
               private cntService:CountriesService,
               @Inject(MAT_DIALOG_DATA) public data:any,) {
    this.getProduct();
  }

  ngOnInit(): void {
    this.statementForm= new FormGroup({

      Track: new FormControl(this.data.track, [
        Validators.required,
        Validators.minLength(5),
      ]),
      Name: new FormControl(
        this.data.name, [
          Validators.required
        ]
      ),
      Product: new FormControl(this.data.product.id, [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Price: new FormControl(this.data.price, [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Weight: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      CargoPrice: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Count: new FormControl(this.data.count, [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Wallet: new FormControl(this.data.countryId, [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      TextArea: new FormControl(this.data.notice, [
      ]),
      FileInput: new FormControl('', [
      ]),
    })
  }
  getProduct(){
    this.proService.getProductsActive().subscribe((res)=>
      {
        res.forEach(p=>{
          p.productTranslates.forEach(pt=>{
            if(pt.languageId==this.languageService.select.id){
              p.productTranslates[0]=pt
              this.products=res;
            }
          })
        })
      }
    )
    this.cntService.getCountriesActive().subscribe(
      (res)=>{
        this.wallet=res;
      })
  }
  public errorHandling = (control: string, error: string) => {
    return this.statementForm.controls[control].hasError(error);
  }
  get Track() {
    return this.statementForm.get('Track');
  }

  submit(){
    const body = new FormData();
    body.append("Track",this.statementForm.controls["Track"].value.trim())
    body.append("Name",this.statementForm.controls["Name"].value.trim())
    body.append("ProductId",this.statementForm.controls["Product"].value)
    body.append("id",this.data.id.toString())
    body.append("Price",this.statementForm.controls["Price"].value)
    body.append("CountryId",this.statementForm.controls["Wallet"].value)
    body.append("Count",this.statementForm.controls["Count"].value)
    body.append("Notice",this.statementForm.controls["TextArea"].value.trim())
    body.append("Weight",this.statementForm.controls["Weight"].value)
    body.append("CamexPrice",this.statementForm.controls["CargoPrice"].value)

    this.service.updateInAnbar(body).subscribe(
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
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44387/Site/images/statements/${serverPath}`;
  }

}
