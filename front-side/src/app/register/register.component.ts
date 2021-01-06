import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title:string="Registration"
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
}
