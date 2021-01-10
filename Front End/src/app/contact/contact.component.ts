import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Address} from './address';
import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.addresses=[
      {
        name:"Baki",
        location:"Xeqani kucesi 1A",
        workTime:["Monday: 10:00-18:00", "Saturday 11:00-19:00"],
        phone:"+994-55-929-48-60",
        email:["seynursm@code.edu.az","seynur.mamedov221@gmail.com"],
        url:"https://www.google.com/maps/place/Local+Pharmacy/@40.4257638,49.9656097,16.22z/data=!4m5!3m4!1s0x40306236c1a2f509:0x41a9123d1b720652!8m2!3d40.4241095!4d49.9684583?hl=ru"
      },{
        name:"Baki",
        location:"Xeqani kucesi 1A",
        workTime:["Monday: 10:00-18:00", "Saturday 11:00-19:00"],
        phone:"+994-55-929-48-60",
        email:["seynursm@code.edu.az","seynur.mamedov221@gmail.com"],
        url:"https://www.google.com/maps/place/Local+Pharmacy/@40.4257638,49.9656097,16.22z/data=!4m5!3m4!1s0x40306236c1a2f509:0x41a9123d1b720652!8m2!3d40.4241095!4d49.9684583?hl=ru"
      },{
        name:"Baki",
        location:"Xeqani kucesi 1A",
        workTime:["Monday: 10:00-18:00", "Saturday 11:00-19:00"],
        phone:"+994-55-929-48-60",
        email:["seynursm@code.edu.az","seynur.mamedov221@gmail.com"],
        url:"https://www.google.com/maps/place/Local+Pharmacy/@40.4257638,49.9656097,16.22z/data=!4m5!3m4!1s0x40306236c1a2f509:0x41a9123d1b720652!8m2!3d40.4241095!4d49.9684583?hl=ru"
      },{
        name:"Baki",
        location:"Xeqani kucesi 1A",
        workTime:["Monday: 10:00-18:00", "Saturday 11:00-19:00"],
        phone:"+994-55-929-48-60",
        email:["seynursm@code.edu.az","seynur.mamedov221@gmail.com"],
        url:"https://www.google.com/maps/place/Local+Pharmacy/@40.4257638,49.9656097,16.22z/data=!4m5!3m4!1s0x40306236c1a2f509:0x41a9123d1b720652!8m2!3d40.4241095!4d49.9684583?hl=ru"
      }
    ]
  }
  name:string="Contact"
  bannerSrc:string="../../assets/image/banners/contact-banner.png";
  addresses:Address[]=[];
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
}
