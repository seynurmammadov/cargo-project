import {Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../../Core/models/Product';
import {CountryData} from '../../../countries-all/CountryData';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {ProductService} from '../../../../Core/services/Admin/product/product.service';
import {CountriesService} from '../../../../Core/services/Admin/countries/countries.service';
import {CargoService} from '../../../../Core/services/cargo/cargo.service';
import {UserOrderService} from '../../../../Core/services/Admin/userOrder/user-order.service';

declare let alertify:any
@Component({
  selector: 'app-add-to-anbar',
  templateUrl: './add-to-anbar.component.html',
  styleUrls: ['./add-to-anbar.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AddToAnbarComponent implements OnInit {

  statementForm:FormGroup
  fileAttr = 'İnvoysu Seç';
  fileToUpload:File;
  products:Product[];
  wallet:CountryData[];
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor( public dialogRef: MatDialogRef<AddToAnbarComponent>,
               private languageService:LanguagesService,
               private service:CargoService,
               private proService:ProductService,
               private cntService:CountriesService,
               public serviceOrder:UserOrderService,
               @Inject(MAT_DIALOG_DATA) public data:any,) {
    this.getProduct()

  }

  ngOnInit(): void {
    console.log(this.data)
    this.statementForm= new FormGroup({

      Track: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      FileInput: new FormControl('', [
        Validators.required,
      ]),
      Weight: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      CamexPrice: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Product: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
    })
  }
  getProduct(){
    this.proService.getProductsActive().subscribe((res)=>
      {
        this.products=res;
        })
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
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      this.fileAttr = imgFile.target.files[0].name

      this.fileToUpload= <File>imgFile.target.files[0]

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'İnvoysu Seç';
    }
  }
  submit(){

    const body = new FormData();
    body.append("Track",this.statementForm.controls["Track"].value.trim())
    body.append("Photo",this.fileToUpload,this.fileToUpload.name)
    body.append("ProductId",this.statementForm.controls["Product"].value)
    body.append("CamexPrice",this.statementForm.controls["CamexPrice"].value)
    body.append("Weight",this.statementForm.controls["Weight"].value)
    body.append("Name",this.data.name)
    body.append("Price",this.data.receipt.value)
    body.append("Count",this.data.count)
    body.append("CountryId",this.data.countryId)
    body.append("Notice",this.data.notice)
    body.append("UserId",this.data.userId)
    body.append("PaymentStatus","true")
     const bodyOrder = new FormData();
    bodyOrder.append("id",this.data.id)
      this.service.create(body).subscribe(
      ()=> {
        this.serviceOrder.refuseOrder(bodyOrder).subscribe(
          ()=> {
            this.dialogRef.close();
          },
          error => {
            error.error.messages.forEach(e=>{
              if(e.lang_id==this.languageService.select.id){
                alertify.error(e.messageLang);
              }
            })
          })

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
