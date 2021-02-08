import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {LanguagesService} from '../../../Core/services/lang/languages.service';
import {CountriesService} from '../../../Core/services/Admin/countries/countries.service';
import {CountryData} from '../../../Admin/countries-all/CountryData';
import {MatDialogRef} from '@angular/material/dialog';
import {BalanceService} from '../../../Core/services/balance/balance.service';
import {OrderService} from '../../../Core/services/order/order.service';

declare let alertify:any
declare let Swal:any

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class OrderDialogComponent implements OnInit {
  orderForm:FormGroup
  wallet:CountryData[];
  user_agreementArr:any[]=[{
    val:"az",
    path:  "../../assets/userAgreement/user_agreement_az.pdf"
  },{
    val:"ru",
    path:  "../../assets/userAgreement/user_agreement_ru.pdf"
  },{
    val:"en",
    path:  "../../assets/userAgreement/user_agreement_en.pdf"
  },
  ]
  user_agreement:string;

  constructor(private languageService:LanguagesService,
              private translate: TranslateService,
              private cntService:CountriesService,
              public dialogRef: MatDialogRef<OrderDialogComponent>,
              private balanceService:BalanceService,
              private service:OrderService) {

    this.orderForm= new FormGroup({
      Name: new FormControl(
        '', [
          Validators.required
        ]
      ),
      Wallet: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      CargoPrice: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Url: new FormControl('', [
        Validators.required
      ]),
      About: new FormControl('', [
        Validators.required
      ]),
      Price: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),

      Count: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Note: new FormControl('', [
      ]),
      PriceTotal: new FormControl('', [

        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      IsTermsAccepted: new FormControl('', [
        Validators.required,
      ])
    })
    this.user_agreement=this.user_agreementArr.find(u=>u.val==languageService.selected).path
    this.get();
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.user_agreement=this.user_agreementArr.find(u=>u.val==this.languageService.select.value).path
    });
  }
  get(){
    this.cntService.getCountriesActive().subscribe(
      (res)=>{
        this.wallet=res;
      })
  }
  public errorHandling = (control: string, error: string) => {
    return this.orderForm.controls[control].hasError(error);
  }
  totalPrice(){
    this.orderForm.controls["PriceTotal"].setValue(((this.orderForm.controls["CargoPrice"].value+this.orderForm.controls["Price"].value)*this.orderForm.controls["Count"].value)+0.5)
  }
  submit(){
    const body = new FormData();
    const bodyBalance = new FormData();
    body.append("Name",this.orderForm.controls["Name"].value.trim())
    body.append("CountryId",this.orderForm.controls["Wallet"].value)
    body.append("CargoPrice",this.orderForm.controls["CargoPrice"].value)
    body.append("Price",this.orderForm.controls["Price"].value)
    body.append("Count",this.orderForm.controls["Count"].value)
    body.append("Url",this.orderForm.controls["Url"].value.trim())
    body.append("NoticeProduct",this.orderForm.controls["About"].value.trim())
    body.append("Notice",this.orderForm.controls["Note"].value.trim())
    body.append("IsTermsAccepted",this.orderForm.controls["IsTermsAccepted"].value)
    bodyBalance.append("total",(((this.orderForm.controls["CargoPrice"].value+this.orderForm.controls["Price"].value)*this.orderForm.controls["Count"].value)+0.5).toString())
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, send it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.balanceService.remove(bodyBalance).subscribe(
          (res)=> {
            body.append("ReceiptId",res.toString())
            this.service.create(body).subscribe(()=>{
              Swal.fire(
                'Successed!',
                'Your statement sent.',
                'success'
              )
              this.dialogRef.close();
            },error => {
              error.error.messages.forEach(e => {
                if (e.lang_id == this.languageService.select.id) {
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
    })


  }
}
