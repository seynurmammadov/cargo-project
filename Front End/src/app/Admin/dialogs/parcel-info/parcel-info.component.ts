import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../Core/models/Product';
import {CountryData} from '../../countries-all/CountryData';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../Core/services/lang/languages.service';
import {CargoService} from '../../../Core/services/cargo/cargo.service';
import {ProductService} from '../../../Core/services/Admin/product/product.service';
import {CountriesService} from '../../../Core/services/Admin/countries/countries.service';
import {Cargo} from '../../../Core/models/Cargo';

@Component({
  selector: 'app-parcel-info',
  templateUrl: './parcel-info.component.html',
  styleUrls: ['./parcel-info.component.scss']
})
export class ParcelInfoComponent implements OnInit {
  statementForm:FormGroup
  products:Product[];
  wallet:CountryData[];
  parcelData:Cargo;
  constructor( public dialogRef: MatDialogRef<ParcelInfoComponent>,
               private languageService:LanguagesService,
               private service:CargoService,
               private proService:ProductService,
               private cntService:CountriesService,
               @Inject(MAT_DIALOG_DATA) public data:any) {

  }

  ngOnInit(): void {
    this.getProduct();
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
    this.service.getWithParcelId(this.data.id).subscribe(
      (res)=>{
        this.parcelData=res;
        console.log(res)
        this.statementForm= new FormGroup({
          Track: new FormControl(this.parcelData.track, [
          ]),
          Name: new FormControl(
            this.parcelData.name, [
            ]
          ),
          Product: new FormControl(this.parcelData.productId, [
          ]),
          Price: new FormControl(this.parcelData.price, [
          ]),
          Count: new FormControl(this.parcelData.count, [
          ]),
          Wallet: new FormControl(this.parcelData.countryId, [
          ]),
          TextArea: new FormControl(this.parcelData.notice, [
          ]),
          CamexID: new FormControl(this.parcelData.camexId, [
          ]),
          CargoPrice: new FormControl(this.parcelData.camexPrice, [
          ]),
          Weight: new FormControl(this.parcelData.weight, [
          ]),
          TrackCamex: new FormControl(this.parcelData.trackCamex, [
          ]),

        })
      })
  }
  public errorHandling = (control: string, error: string) => {
    return this.statementForm.controls[control].hasError(error);
  }
  get Track() {
    return this.statementForm.get('Track');
  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44387/Site/images/statements/${serverPath}`;
  }

}
