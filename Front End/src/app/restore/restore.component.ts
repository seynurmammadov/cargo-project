import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.scss']
})
export class RestoreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  title:string="Restore PAssword"
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
}
