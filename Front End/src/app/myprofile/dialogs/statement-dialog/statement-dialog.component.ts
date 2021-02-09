import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../Core/services/lang/languages.service';
import {StatementService} from '../../../Core/services/statement/statement.service';
import {ProductService} from '../../../Core/services/Admin/product/product.service';
import {Product} from '../../../Core/models/Product';
import {CountriesService} from '../../../Core/services/Admin/countries/countries.service';
import {CountryData} from '../../../Admin/countries-all/CountryData';
import {TranslateService} from '@ngx-translate/core';
declare let alertify:any

@Component({
  selector: 'app-statement-dialog',
  templateUrl: './statement-dialog.component.html',
  styleUrls: ['./statement-dialog.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class StatementDialogComponent implements OnInit {
  statementForm:FormGroup
  fileAttr = this.translate.instant("ChooseFile");
  fileToUpload:File;
  products:Product[];
  wallet:CountryData[];
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor( public dialogRef: MatDialogRef<StatementDialogComponent>,
               private languageService:LanguagesService,
               private service:StatementService,
               private proService:ProductService,
               private translate:TranslateService,
               private cntService:CountriesService) {
    this.getProduct();
  }

  ngOnInit(): void {
    this.statementForm= new FormGroup({

      Track: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      Name: new FormControl(
        '', [
          Validators.required
        ]
      ),
      Product: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
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
      FileInput: new FormControl('', [
        Validators.required,
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
      this.fileAttr = 'Choose File';
    }
  }
  submit(){
    const body = new FormData();
    body.append("Track",this.statementForm.controls["Track"].value.trim())
    body.append("Name",this.statementForm.controls["Name"].value.trim())
    body.append("ProductId",this.statementForm.controls["Product"].value)
    body.append("Price",this.statementForm.controls["Price"].value)
    body.append("CountryId",this.statementForm.controls["Wallet"].value)
    body.append("Count",this.statementForm.controls["Count"].value)
    body.append("Notice",this.statementForm.controls["TextArea"].value.trim())
    body.append("Photo",this.fileToUpload,this.fileToUpload.name)
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
