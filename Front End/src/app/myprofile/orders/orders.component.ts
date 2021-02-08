import {Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {OrderDialogComponent} from '../dialogs/order-dialog/order-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {Order} from '../../Core/models/Order';
import {OrderService} from '../../Core/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['name','url','total','IsActived'];
  dataSource: MatTableDataSource<Order>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Data:Order[];
  @Output() event = new EventEmitter();
  callParent(): void {
    this.event.next();
  }
  constructor(public languageService:LanguagesService,public service:OrderService,public dialog: MatDialog,) {
    this.get()
  }


  ngOnInit(): void {
  this.get()
  }
  get(){
  this.service.get().subscribe(res=>{
      this.Data=res;
      this.dataSource = new MatTableDataSource(this.Data);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
      });
  })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
openDialogCreate(): void {
    const dialogRefCreate = this.dialog.open(OrderDialogComponent, {
      width: '1000px',
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.get()
      this.callParent()

    });
  }
}
