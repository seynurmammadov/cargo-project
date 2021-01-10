import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {CurrentCity} from "./Models/currentCity";
import {Office} from "../home/models/office";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.currentCities=[{
      id:1,
      name:"Baku"
    },
      {
        id:2,
        name:"Baku2"
      },
      {
        id:3,
        name:"Baku3"
      }]
    this.offices=[ {
      name:'Baki,Nefciler',
      value:'1',
    },]
  }

  currentCities:CurrentCity[]=[];
  offices:Office[]=[];
  title:string="Registration"
  user_agreement:string="../../assets/userAgreement/user_agreement_az.pdf"
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passportImgSrc:string="../../assets/image/passport/passport_id_az.jpg"
  changeImg(val:string){
    if(val=="non-az"){
      this.passportImgSrc="../../assets/image/passport/passport_id_non_az.jpg"
    }
    else{
      this.passportImgSrc="../../assets/image/passport/passport_id_az.jpg"
    }
  }

}
