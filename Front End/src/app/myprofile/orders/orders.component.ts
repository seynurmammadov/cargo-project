import {Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {OrderDialogComponent} from '../dialogs/order-dialog/order-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {Order} from '../../Core/models/Order';
import {OrderService} from '../../Core/services/order/order.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

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
  user_agreement:string;
  user_agreementArr:any[]=[{
    val:"az",
    path:  "../../assets/userAgreement/user_agreement_az.pdf"
  },{
    val:"ru",
    path:  "../../assets/userAgreement/user_agreement_ru.pdf"
  },{
    val:"en",
    path:  "../../assets/userAgreement/user_agreement_en.pdf"
  },
  ]
  @Output() event = new EventEmitter();
  callParent(): void {
    this.event.next();
  }
  constructor(public languageService:LanguagesService,public service:OrderService,public dialog: MatDialog, private translate: TranslateService,) {
    this.get()

    this.user_agreement=this.user_agreementArr.find(u=>u.val==languageService.selected).path
  }


  ngOnInit(): void {
  this.get()
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.user_agreement=this.user_agreementArr.find(u=>u.val==this.languageService.select.value).path
    });
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
      data: this.user_agreement
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.get()
      this.callParent()

    });
  }
}
