import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {City} from "../Core/models/City";
import {Office} from "../Core/models/Office";
import {LanguagesService} from '../Core/services/lang/languages.service';
import {RegistrationService} from './Registration/registration.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {Router} from '@angular/router';
declare let alertify:any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  currentCities:City[]=[];
  offices:Office[]=[];
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
  privateForm:FormGroup
  businessForm:FormGroup

  constructor(
    private registerService:RegistrationService,
    private languageService:LanguagesService,
    private translate: TranslateService,
    private router: Router){
    this.getData()
    this.user_agreement=this.user_agreementArr.find(u=>u.val==languageService.selected).path
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getData()
      this.user_agreement=this.user_agreementArr.find(u=>u.val==this.languageService.select.value).path
    });
    this.privateForm= new FormGroup({
      Email : new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      PassportNumber: new FormControl(
        '', [
          Validators.required,
          Validators.min(1),
          Validators.max(99999999),
          Validators.pattern(/^\d*\.?\d*$/)
        ]
      ),
      Name: new FormControl(
        '', [
          Validators.required
        ]
      ),
      Surname: new FormControl(
        '', [
          Validators.required
        ]
      ),
      Lastname: new FormControl('', [
        Validators.required
      ]),
      Birthday: new FormControl('', [
        Validators.required
      ]),
      CitizenshipId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      FINCode: new FormControl('', [
        Validators.required,
      ]),
      IsMan: new FormControl('', [
        Validators.required
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
      ]),
      CheckPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
        RxwebValidators.compare({fieldName:'Password'})
      ]),
      CityId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Address: new FormControl('', [
        Validators.required
      ]),
      PhoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      OfficeId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      IsTermsAccepted: new FormControl('', [
        Validators.required,
      ])
    })
    this.businessForm= new FormGroup({
      Email : new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      CompanyName: new FormControl('', [
          Validators.required
        ]
      ),
      CompanyRegistrationNumber: new FormControl('', [
          Validators.required,
          Validators.min(1),
          Validators.max(999999999),
          Validators.pattern(/^\d*\.?\d*$/)
        ]
      ),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
      ]),
      CheckPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
        RxwebValidators.compare({fieldName:'Password'})
      ]),
      CityId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Address: new FormControl('', [
        Validators.required
      ]),
      PhoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      OfficeId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      IsTermsAccepted: new FormControl('', [
        Validators.required,
      ])
    })
  }

  passportImgSrc:string="../../assets/image/passport/passport_id_az.jpg"
  changeImg(val:number){
    if(val==1){
      this.passportImgSrc="../../assets/image/passport/passport_id_non_az.jpg"
    }
    else{
      this.passportImgSrc="../../assets/image/passport/passport_id_az.jpg"
    }
  }

  submit() {
    const body = {
      "Address": this.privateForm.controls['Address'].value,
      "Birthday": JSON.stringify(this.privateForm.controls['Birthday'].value).split('"').join(''),
      "CheckPassword": this.privateForm.controls['CheckPassword'].value.split(' ').join(''),
      "CityId": this.privateForm.controls['CityId'].value,
      "Email": this.privateForm.controls['Email'].value.split(' ').join(''),
      "FINCode": this.privateForm.controls['FINCode'].value.split(' ').join(''),
      "IsMan": this.privateForm.controls['IsMan'].value,
      "IsTermsAccepted": this.privateForm.controls['IsTermsAccepted'].value,
      "PassportNumber": this.privateForm.controls['PassportNumber'].value,
      "Password": this.privateForm.controls['Password'].value.split(' ').join(''),
      "PhoneNumber": this.privateForm.controls['PhoneNumber'].value.split(' ').join(''),
      "Surname": this.privateForm.controls['Surname'].value.split(' ').join(''),
      "CitizenshipId": this.privateForm.controls['CitizenshipId'].value,
      "Lastname": this.privateForm.controls['Lastname'].value.split(' ').join(''),
      "Name": this.privateForm.controls['Name'].value.split(' ').join(''),
      "OfficeId": this.privateForm.controls['OfficeId'].value
    }
    this.registerService.PostRegisterPrivate(body).subscribe(
    ()=> {
        this.router.navigate(['login'])
    },
    error => {
        error.error.messages.forEach(e=>{
          if(e.lang_id==this.languageService.select.id){
            alertify.error(e.messageLang);
          }
      })
    })
  }
  submitBusiness(){
    const body={
      "CheckPassword": this.businessForm.controls['CheckPassword'].value.split(' ').join(''),
      "CityId": this.businessForm.controls['CityId'].value,
      "Email": this.businessForm.controls['Email'].value.split(' ').join(''),
      "IsTermsAccepted": this.businessForm.controls['IsTermsAccepted'].value,
      "CompanyRegistrationNumber": this.businessForm.controls['CompanyRegistrationNumber'].value,
      "Password": this.businessForm.controls['Password'].value.split(' ').join(''),
      "PhoneNumber": this.businessForm.controls['PhoneNumber'].value.split(' ').join(''),
      "Address": this.businessForm.controls['Address'].value,
      "CompanyName": this.businessForm.controls['CompanyName'].value,
      "OfficeId": this.businessForm.controls['OfficeId'].value
    }
    this.registerService.PostRegisterBusiness(body).subscribe(()=> {
        this.router.navigate(['login'])
      },
      error => {
        error.error.messages.forEach(e=>{
          if(e.lang_id==this.languageService.select.id){
            alertify.error(e.messageLang);
          }
        })
      })
  }

  public errorHandling = (control: string, error: string) => {
    return this.privateForm.controls[control].hasError(error);
  }
  public errorHandlingBusiness = (control: string, error: string) => {
    return this.businessForm.controls[control].hasError(error);
  }
  getData(){
    this.registerService.getRegister().subscribe(res => {
      res.cities.forEach(c=>{
        c.cityNameTranslates.forEach(ct=>{
          if(ct.languageId==this.languageService.select.id){
            this.currentCities=res.cities;
            this.currentCities.forEach(a=>a.cityNameTranslates[0]=ct)
          }
        })

      })
      res.offices.forEach(o=>{
        o.officeNameTranlates.forEach(of=>{
          if(of.languageId==this.languageService.select.id){
            this.offices=res.offices;
            this.offices.forEach(a=>a.officeNameTranlates[0]=of)
          }
        })
      })
    });
  }

  get PhoneNumber() {
    return this.privateForm.get('PhoneNumber');
  }
  get Password() {
    return this.privateForm.get('Password');
  }
  get PhoneNumberBusiness() {
    return this.businessForm.get('PhoneNumber');
  }
  get PasswordBusiness() {
    return this.businessForm.get('Password');
  }
}
