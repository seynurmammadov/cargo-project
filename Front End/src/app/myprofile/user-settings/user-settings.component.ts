import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {RegistrationService} from '../../register/Registration/registration.service';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {Router} from '@angular/router';
import {City} from '../../Core/models/City';
import {Office} from '../../Core/models/Office';
declare let alertify:any
@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  privateForm:FormGroup
  businessForm:FormGroup
  @Input() user;
  currentCities:City[];
  offices:Office[];

  fileAttr = this.translate.instant("ChooseFile");
  fileToUpload:File
  @ViewChild('fileInput') fileInput: ElementRef;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(
    private registerService:RegistrationService,
    private languageService:LanguagesService,
    private translate: TranslateService,
    private router: Router){
    this.getData()
  }
  public errorHandling = (control: string, error: string) => {
    return this.privateForm.controls[control].hasError(error);
  }
  getData(){
    this.registerService.getRegister().subscribe(res => {
      res.cities.forEach(c=>{
        c.cityNameTranslates.forEach(ct=>{
          if(ct.languageId==this.languageService.select.id){
            c.cityNameTranslates[0]=ct
            this.currentCities=res.cities;
          }
        })

      })
      res.offices.forEach(o=>{
        o.officeNameTranlates.forEach(of=>{
          if(of.languageId==this.languageService.select.id){
            o.officeNameTranlates[0]=of;
            this.offices=res.offices;
          }
        })
      })
    });
  }
  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getData()
    });

   if(this.user.privateCustomer!=null){
     this.privateForm= new FormGroup({
       Email : new FormControl({value: this.user.user.email , disabled: true}, [
         Validators.required,
         Validators.email,
       ]),
       PassportNumber: new FormControl(
         {value: this.user.privateCustomer.passportNumber , disabled: true}, [
           Validators.required,
           Validators.min(1),
           Validators.max(99999999),
           Validators.pattern(/^\d*\.?\d*$/)
         ]
       ),
       Name: new FormControl(
         {value: this.user.privateCustomer.name, disabled: true}, [
           Validators.required
         ]
       ),
       Surname: new FormControl(
         {value: this.user.privateCustomer.surname, disabled: true}, [
           Validators.required
         ]
       ),
       Lastname: new FormControl({value: this.user.privateCustomer.lastname, disabled: true},  [
         Validators.required
       ]),
       Birthday: new FormControl(this.user.privateCustomer.birthday, [
         Validators.required
       ]),
       FINCode: new FormControl({value: this.user.privateCustomer.finCode, disabled: true}, [
         Validators.required,
       ]),
       IsMan: new FormControl(""+this.user.privateCustomer.isMan, [
         Validators.required
       ]),
       CurrentPassword: new FormControl('', [
         Validators.minLength(8),
         Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
       ]),
       Password: new FormControl('', [
         Validators.minLength(8),
         Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
       ]),
       CheckPassword: new FormControl('', [
         Validators.minLength(8),
         Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
         RxwebValidators.compare({fieldName:'Password'})
       ]),
       CityId: new FormControl(this.user.user.cityId, [
         Validators.required,
         Validators.pattern(/^\d*\.?\d*$/)
       ]),
       Address: new FormControl(this.user.user.address, [
         Validators.required
       ]),
       PhoneNumber: new FormControl(this.user.user.phoneNumber, [
         Validators.required,
         Validators.minLength(9),
         Validators.maxLength(9),
         Validators.pattern(/^\d*\.?\d*$/)
       ]),
       OfficeId: new FormControl(this.user.user.officeId, [
         Validators.required,
         Validators.pattern(/^\d*\.?\d*$/)
       ]),
       FileInput: new FormControl('', [
       ]),
     })
   }
   else{
     this.businessForm= new FormGroup({
       Email : new FormControl({value: this.user.user.email , disabled: true}, [
         Validators.required,
         Validators.email,
       ]),
       CompanyName: new FormControl(this.user.businessCustomer.companyName, [
           Validators.required
         ]
       ),
       CompanyRegistrationNumber: new FormControl({value: this.user.businessCustomer.companyRegistrationNumber , disabled: true}, [
           Validators.required,
           Validators.min(1),
           Validators.max(999999999),
           Validators.pattern(/^\d*\.?\d*$/)
         ]
       ),
       CurrentPassword: new FormControl('', [
         Validators.minLength(8),
         Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
       ]),
       Password: new FormControl('', [
         Validators.minLength(8),
         Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
       ]),
       CheckPassword: new FormControl('', [
         Validators.minLength(8),
         Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
         RxwebValidators.compare({fieldName:'Password'})
       ]),
       CityId: new FormControl(this.user.user.cityId, [
         Validators.required,
         Validators.pattern(/^\d*\.?\d*$/)
       ]),
       Address: new FormControl(this.user.user.address, [
         Validators.required
       ]),
       PhoneNumber: new FormControl(this.user.user.phoneNumber, [
         Validators.required,
         Validators.minLength(9),
         Validators.maxLength(9),
         Validators.pattern(/^\d*\.?\d*$/)
       ]),
       OfficeId: new FormControl(this.user.user.officeId, [
         Validators.required,
         Validators.pattern(/^\d*\.?\d*$/)
       ]),
       FileInput: new FormControl('', [
       ]),
     })
   }
  }
  submit() {
    const body = new FormData()
    body.append("CheckPassword",this.privateForm.controls['CheckPassword'].value.split(' ').join(''))
    body.append("Password",this.privateForm.controls['Password'].value.split(' ').join(''))
    body.append("CurrentPassword",this.privateForm.controls['CurrentPassword'].value.split(' ').join(''))
    body.append("CityId",this.privateForm.controls['CityId'].value)
    body.append("Address",this.privateForm.controls['Address'].value)
    body.append("PhoneNumber",this.privateForm.controls['PhoneNumber'].value)
    body.append("OfficeId",this.privateForm.controls['OfficeId'].value)
    body.append("Birthday",JSON.stringify(this.privateForm.controls['Birthday'].value).split('"').join(''))
    body.append("IsMan",this.privateForm.controls['IsMan'].value)
    if(this.fileToUpload == undefined){
      body.append("Photo",null)
    }
    else{
      body.append("Photo",this.fileToUpload,this.fileToUpload.name)
    }
    this.registerService.UpdatePrivate(body).subscribe(
      ()=> {
        alertify.success(this.translate.instant("changed")+"!");
        setTimeout(()=>{
          window.location.reload();
        },1500)
      },
      error => {
        error.error.messages.forEach(e=>{
          if(e.lang_id==this.languageService.select.id){
            alertify.error(e.messageLang);
          }
        })
      })
  }
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      this.fileAttr = imgFile.target.files[0].name

      this.fileToUpload= <File>imgFile.target.files[0]

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = this.translate.instant("ChooseFile");
    }
  }
  submitBusiness(){
    const body = new FormData()
    body.append("CheckPassword",this.businessForm.controls['CheckPassword'].value.split(' ').join(''))
    body.append("Password",this.businessForm.controls['Password'].value.split(' ').join(''))
    body.append("CurrentPassword",this.businessForm.controls['CurrentPassword'].value.split(' ').join(''))
    body.append("CityId",this.businessForm.controls['CityId'].value)
    body.append("Address",this.businessForm.controls['Address'].value)
    body.append("PhoneNumber",this.businessForm.controls['PhoneNumber'].value)
    body.append("OfficeId",this.businessForm.controls['OfficeId'].value)
    body.append("CompanyName",this.businessForm.controls['CompanyName'].value)
    if(this.fileToUpload == undefined){
      body.append("Photo",null)
    }
    else{
      body.append("Photo",this.fileToUpload,this.fileToUpload.name)
    }
    this.registerService.UpdateBusiness(body).subscribe((s)=> {
        alertify.success(this.translate.instant("changed")+"!");
        setTimeout(()=>{
          window.location.reload();
        },1500)
      },
      error => {
        error.error.messages.forEach(e=>{
          if(e.lang_id==this.languageService.select.id){
            alertify.error(e.messageLang);
          }
        })
      })
  }
  get PhoneNumber() {
    return this.privateForm.get('PhoneNumber');
  }
  get Password() {
    return this.privateForm.get('Password');
  }
  get CurrentPassword() {
    return this.privateForm.get('CurrentPassword');
  }
  get CurrentPasswordBusiness() {
    return this.businessForm.get('CurrentPassword');
  }
  get PhoneNumberBusiness() {
    return this.businessForm.get('PhoneNumber');
  }
  get PasswordBusiness() {
    return this.businessForm.get('Password');
  }
  public errorHandlingBusiness = (control: string, error: string) => {
    return this.businessForm.controls[control].hasError(error);
  }
}
