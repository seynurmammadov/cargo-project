import {Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../Core/models/Product';
import {CountryData} from '../../../Admin/countries-all/CountryData';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../Core/services/lang/languages.service';
import {ProductService} from '../../../Core/services/Admin/product/product.service';
import {CountriesService} from '../../../Core/services/Admin/countries/countries.service';
import {CargoService} from '../../../Core/services/cargo/cargo.service';
import {TranslateService} from '@ngx-translate/core';
declare let alertify:any
@Component({
  selector: 'app-waiting-invoice-dialog',
  templateUrl: './waiting-invoice-dialog.component.html',
  styleUrls: ['./waiting-invoice-dialog.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class WaitingInvoiceDialogComponent implements OnInit {
  statementForm:FormGroup
  fileAttr = this.translate.instant("ChooseFile");
  fileToUpload:File;
  products:Product[];
  wallet:CountryData[];
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor( public dialogRef: MatDialogRef<WaitingInvoiceDialogComponent>,
               private languageService:LanguagesService,
               private service:CargoService,
               private proService:ProductService,
               private translate:TranslateService,
               private cntService:CountriesService,
               @Inject(MAT_DIALOG_DATA) public data:any) {
    this.getProduct();
  }

  ngOnInit(): void {

      this.statementForm= new FormGroup({
      Track: new FormControl(this.data.row.track, [
        Validators.required,
        Validators.minLength(5),
      ]),
      Name: new FormControl(
        this.data.row.name, [
          Validators.required
        ]
      ),
      Product: new FormControl(this.data.row.productId, [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Price: new FormControl(this.data.row.price, [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Count: new FormControl(this.data.row.count, [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Wallet: new FormControl(this.data.row.countryId, [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      TextArea: new FormControl(this.data.row.notice, [
      ]),

    })
    if(this.data.row.image==null || this.data.row.image=="") {
      this.statementForm.addControl('FileInput',new FormControl('', [
        Validators.required
      ]))
    }
    else{
      this.statementForm.addControl('FileInput',new FormControl('', [
      ]))
    }
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

      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }
  submit(){
    const body = new FormData();
    body.append("Track",this.data.row.track)
    body.append("Name",this.statementForm.controls["Name"].value.trim())
    body.append("ProductId",this.statementForm.controls["Product"].value)
    body.append("id",this.data.row.id.toString())
    body.append("Price",this.statementForm.controls["Price"].value)
    body.append("CountryId",this.statementForm.controls["Wallet"].value)
    body.append("Count",this.statementForm.controls["Count"].value)
    body.append("Notice",this.statementForm.controls["TextArea"].value.trim())
    if(this.data.row.image==null || this.data.row.image==""){
      body.append("Photo",this.fileToUpload,this.fileToUpload.name)
    }
    this.service.updateInvoice(body).subscribe(
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
