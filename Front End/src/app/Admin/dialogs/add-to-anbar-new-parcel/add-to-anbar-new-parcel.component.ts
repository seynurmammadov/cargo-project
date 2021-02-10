import {Component, ElementRef,  OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../Core/models/Product';
import {CountryData} from '../../countries-all/CountryData';
import { MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../Core/services/lang/languages.service';
import {CargoService} from '../../../Core/services/cargo/cargo.service';
import {ProductService} from '../../../Core/services/Admin/product/product.service';
import {CountriesService} from '../../../Core/services/Admin/countries/countries.service';
import {UserOrderService} from '../../../Core/services/Admin/userOrder/user-order.service';
declare let alertify:any
@Component({
  selector: 'app-add-to-anbar-new-parcel',
  templateUrl: './add-to-anbar-new-parcel.component.html',
  styleUrls: ['./add-to-anbar-new-parcel.component.scss']
})
export class AddToAnbarNewParcelComponent implements OnInit {

  statementForm:FormGroup
  fileAttr = 'Şəkil Seç';
  fileToUpload:File;
  products:Product[];
  wallet:CountryData[];
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor( public dialogRef: MatDialogRef<AddToAnbarNewParcelComponent>,
               private languageService:LanguagesService,
               private service:CargoService,
               private proService:ProductService,
               private cntService:CountriesService,
               public serviceOrder:UserOrderService) {
    this.getProduct()
  }

  ngOnInit(): void {
    this.statementForm= new FormGroup({
      Track: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      FileInput: new FormControl('', [
      ]),
      Weight: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      CamexId: new FormControl('', [
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
      Name: new FormControl('', [
          Validators.required
        ]
      ),
      Price: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),

      Count: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Wallet: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      TextArea: new FormControl('', [
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
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      this.fileAttr = imgFile.target.files[0].name

      this.fileToUpload= <File>imgFile.target.files[0]

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Şəkil Seç';
    }
  }
  submit(){

    const body = new FormData();
    body.append("Track",this.statementForm.controls["Track"].value.trim())
    if(this.fileToUpload!=undefined){
      body.append("Photo",this.fileToUpload,this.fileToUpload.name)
    }
    body.append("ProductId",this.statementForm.controls["Product"].value)
    body.append("CamexPrice",this.statementForm.controls["CamexPrice"].value)
    body.append("Weight",this.statementForm.controls["Weight"].value)

    body.append("Name",this.statementForm.controls["Name"].value.trim())
    body.append("Price",this.statementForm.controls["Price"].value)
    body.append("CountryId",this.statementForm.controls["Wallet"].value)
    body.append("Count",this.statementForm.controls["Count"].value)
    body.append("Notice",this.statementForm.controls["TextArea"].value.trim())
    body.append("CamexId",this.statementForm.controls["CamexId"].value)
    body.append("PaymentStatus","false")

    this.service.create(body).subscribe(
      ()=> {
        alertify.success("Added");

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
