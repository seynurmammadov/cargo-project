import {Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Cargo} from '../../Core/models/Cargo';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {CargoService} from '../../Core/services/cargo/cargo.service';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {WaitingInvoiceDialogComponent} from '../dialogs/waiting-invoice-dialog/waiting-invoice-dialog.component';
import {SelectionModel} from '@angular/cdk/collections';
import {BalanceService} from '../../Core/services/balance/balance.service';
declare let Swal:any
declare let alertify:any
@Component({
  selector: 'app-in-anbar',
  templateUrl: './in-anbar.component.html',
  styleUrls: ['./in-anbar.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class InAnbarComponent implements OnInit {

  dataSource: MatTableDataSource<Cargo>
  selection = new SelectionModel<Cargo>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Data:Cargo[];
  @Output() event = new EventEmitter();
  callParent(): void {
    this.event.next();
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;

  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Cargo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.track + 1}`;

  }

  displayedColumns: string[] = ['select','track','name','weight','price','status','office','actions'];
  constructor(
    private balanceService:BalanceService,
    public languageService:LanguagesService,
    public service:CargoService,
    public dialog: MatDialog,
    private translate: TranslateService) {
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
    this.translate.onLangChange.subscribe(() => {
      this.get()
    });
  }
  loaded:boolean=false
  get(){
    this.service.getAll().subscribe(res=>{
      res.forEach(p=>{
        p.office.officeNameTranlates.forEach(pt=>{
          if(pt.languageId==this.languageService.select.id){
            p.office.officeNameTranlates[0]=pt
          }
        })
      })
      this.Data=res;
      this.dataSource = new MatTableDataSource(this.Data);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
      });

      this.loaded=true
    })
  }

  openDialogEdit(row): void {
    if(row.status.name == 'InAnbar'){
      const dialogRefEdit = this.dialog.open(WaitingInvoiceDialogComponent, {
        width: '1000px',
        data: {row:row}
      });
      dialogRefEdit.afterClosed().subscribe(() => {
        this.get()
      });
    }
  }
  count:number=0;
  totalPrice:number=0;
  balanceDisplay:boolean=false
  log(){

    setTimeout(()=>  {
      this.totalPrice=0
      this.count=0
      this.selection.selected.forEach(p=> {
        if(!p.paymentStatus){
          this.count++
          this.totalPrice+=p.camexPrice;
          this.balanceService.status(p.id)
        }
      })
      this.balanceDisplay=true;
        if(this.count==0){
          this.balanceDisplay=false;
        }
      }

    )

  }
  pay(total){
    const bodyBalance = new FormData();
    bodyBalance.append("total",total)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, send it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.balanceService.remove(bodyBalance).subscribe(
          (res) => {
            this.selection.selected.forEach(p=> {
              if(!p.paymentStatus){
                this.balanceService.status(p.id).subscribe(()=>{
                  Swal.fire(
                    'Successed!',
                    'Your statement sent.',
                    'success')
                    this.get()
                    this.callParent()
                  this.count=0
                  this.totalPrice=0
                  this.selection.isSelected(null);
                  this.balanceDisplay=false
                  },
                  error => {
                    error.error.messages.forEach(e => {
                      if (e.lang_id == this.languageService.select.id) {
                        alertify.error(e.messageLang);
                      }
                    })
               })
              }
            })

          },
          error => {
            error.error.messages.forEach(e => {
              if (e.lang_id == this.languageService.select.id) {
                alertify.error(e.messageLang);
              }
            })
          }
        )
      }
    })


  }



}
