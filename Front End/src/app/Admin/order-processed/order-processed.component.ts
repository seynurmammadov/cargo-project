import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Order} from '../../Core/models/Order';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {OrderAdminService} from '../../Core/services/orderAdmin/order-admin.service';
import {MatDialog} from '@angular/material/dialog';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {UserOrderService} from '../../Core/services/Admin/userOrder/user-order.service';
import {OrderInfoComponent} from '../dialogs/order/order-info/order-info.component';
import {AddToAnbarComponent} from '../dialogs/cargo/add-to-anbar/add-to-anbar.component';
declare let alertify:any
declare let Swal:any
@Component({
  selector: 'app-order-processed',
  templateUrl: './order-processed.component.html',
  styleUrls: ['./order-processed.component.scss'],
  encapsulation:ViewEncapsulation.None

})
export class OrderProcessedComponent implements OnInit {

  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  data:Order[];
  displayedColumns: string[] = ['name','url','total','isActived','actions'];
  constructor(public service:OrderAdminService,
              public dialog: MatDialog,
              private languageService:LanguagesService,
              private serviceOrder:UserOrderService) {

    this.get()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
  }
  loaded:boolean=false
  get(){
    this.service.get("Processed").subscribe(res=>{
      this.data=res;
      this.dataSource = new MatTableDataSource(this.data);
      this.loaded=true
      setTimeout(() => {
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort;
        }
      )

    })
  }
  openDialogInfo(row): void {
    this.dialog.open(OrderInfoComponent, {
      width: '1050px',
      data: {row:row}
    });
  }

  refuse(id,receiptId,orderId){
    const body = new FormData();
    body.append("id",id)
    body.append("receiptId",receiptId)

    const bodyOrder = new FormData();
    bodyOrder.append("id",orderId)
    Swal.fire({
      title: 'Əminsiniz?',
      text: "Bunu geri qaytara bilməyəcəksiz!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Ləğv et',
      confirmButtonText: 'Rəd Et!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Rəd edildi!',
          '',
          'success'
        )
        this.serviceOrder.refuse(body).subscribe(
          ()=> {
            this.serviceOrder.refuseOrder(bodyOrder).subscribe(
              ()=> {
                this.get();
              },
              error => {
                error.error.messages.forEach(e=>{
                  if(e.lang_id==this.languageService.select.id){
                    alertify.error(e.messageLang);
                  }
                })
              })
          },
          error => {
            error.error.messages.forEach(e=>{
              if(e.lang_id==this.languageService.select.id){
                alertify.error(e.messageLang);
              }
            })
          })
      }
    })
  }
  openDialogAdd(row){
    const dialogRefCreate = this.dialog.open(AddToAnbarComponent, {
      width: '500px',
      data: row
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.get()
    });
  }
}
