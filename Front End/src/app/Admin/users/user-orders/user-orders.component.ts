import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {LanguagesService} from '../../../Core/services/lang/languages.service';
import {ActivatedRoute} from '@angular/router';
import {Order} from '../../../Core/models/Order';
import {UserOrderService} from '../../../Core/services/Admin/userOrder/user-order.service';
import {AppUser} from '../../Models/AppUser';
import {OrderInfoComponent} from '../../dialogs/order/order-info/order-info.component';
import {AddToAnbarComponent} from '../../dialogs/cargo/add-to-anbar/add-to-anbar.component';
declare let alertify:any
declare let Swal:any
@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class UserOrdersComponent implements OnInit {

  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  data:AppUser;
  userId:number;
  displayedColumns: string[] = ['name','url','total','isActived','actions'];
  constructor(public service:UserOrderService,public dialog: MatDialog,private languageService:LanguagesService, private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe(param=>{
      this.userId=param.id
    })
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
    this.service.get(this.userId).subscribe(res=>{
      this.data=res;
      this.dataSource = new MatTableDataSource(this.data.orders);
      this.loaded=true
      setTimeout(() =>
      {
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
      })

    })
  }
  openDialogInfo(row): void {
     this.dialog.open(OrderInfoComponent, {
      width: '1050px',
      data: {row:row}
    });
  }
  checkStatus(name){
    if (name == 'Processed'){
      return true
    }
    return false;
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
      confirmButtonText: 'Poz!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Pozuldu!',
          'Data pozuldu!',
          'success'
        )
        this.service.refuse(body).subscribe(
          ()=> {
            this.service.refuseOrder(bodyOrder).subscribe(
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
  changeStatus(orderId){

    const bodyOrder = new FormData();
    bodyOrder.append("id",orderId)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.service.changeStatus(bodyOrder).subscribe(
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
