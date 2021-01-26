import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {OrderDialogComponent} from '../dialogs/order-dialog/order-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(){
    const dialogRef = this.dialog.open(OrderDialogComponent,{
      maxWidth:'60vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
