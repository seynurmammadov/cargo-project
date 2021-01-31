import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CountryData} from '../../../countries-all/CountryData';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit {

  orderForm:FormGroup
  wallet:CountryData[];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              public dialogRef: MatDialogRef<OrderInfoComponent>) {
      console.log(this.data)
    this.orderForm= new FormGroup({
      Name: new FormControl(this.data.row.name),
      Wallet: new FormControl(this.data.row.country.wallet ),
      CargoPrice: new FormControl(this.data.row.cargoPrice),
      Url: new FormControl(this.data.row.url),
      About: new FormControl(this.data.row.noticeProduct),
      Price: new FormControl(this.data.row.price),
      Count: new FormControl(this.data.row.count),
      Note: new FormControl(this.data.row.notice),
      PriceTotal: new FormControl(this.data.row.receipt.value ),
    })
  }

  ngOnInit(): void {
  }
}
