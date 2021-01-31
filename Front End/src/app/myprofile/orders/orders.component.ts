import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {OrderDialogComponent} from '../dialogs/order-dialog/order-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {AppUser} from '../../Admin/Models/AppUser';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {CountryData} from '../../Admin/countries-all/CountryData';
import {StatementUpdateComponent} from '../dialogs/statement-update/statement-update.component';
import {Order} from '../../Core/models/Order';
import {OrderService} from '../../Core/services/order/order.service';

declare let alertify:any
declare let Swal:any
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class OrdersComponent implements OnInit,OnChanges {
  displayedColumns: string[] = ['name','url','total','IsActived'];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() user:AppUser;
  @Output() event = new EventEmitter();
  callParent(): void {
    this.event.next();
  }
  constructor(public languageService:LanguagesService,public service:OrderService,public dialog: MatDialog,) {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.get()
  }
  ngOnChanges(changes:SimpleChanges) {
    this.user= changes.user.currentValue
    this.get()
  }
  get(){
    this.user.cargos.forEach(p=>{
      p.product.productTranslates.forEach(pt=>{
        if(pt.languageId==this.languageService.select.id){
          p.product.productTranslates[0]=pt
        }
      })
    })
    this.dataSource = new MatTableDataSource(this.user.orders);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.dataSource.sort = this.sort;
  }

openDialogCreate(): void {
    const dialogRefCreate = this.dialog.open(OrderDialogComponent, {
      width: '1000px',
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.callParent()
    });
  }
}
