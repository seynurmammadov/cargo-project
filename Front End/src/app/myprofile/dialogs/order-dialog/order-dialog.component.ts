import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {LanguagesService} from '../../../Core/services/lang/languages.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit {
  orderForm:FormGroup
  constructor(private languageService:LanguagesService, private translate: TranslateService) {
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

  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.user_agreement=this.user_agreementArr.find(u=>u.val==this.languageService.select.value).path
    });
  }
  public errorHandling = (control: string, error: string) => {
    return this.orderForm.controls[control].hasError(error);
  }
  user_agreementArr:any[]=[{
    val:"az",
    path:  "../../assets/userAgreement/user_agreement_az.pdf"
  },
    {
      val:"ru",
      path:  "../../assets/userAgreement/user_agreement_ru.pdf"
    },
    {
      val:"en",
      path:  "../../assets/userAgreement/user_agreement_en.pdf"
    },
  ]
  user_agreement:string;
  submit(){

  }
}
