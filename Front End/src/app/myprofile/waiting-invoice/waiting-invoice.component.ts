import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Cargo} from '../../Core/models/Cargo';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {CargoService} from '../../Core/services/cargo/cargo.service';
import {WaitingInvoiceDialogComponent} from '../dialogs/waiting-invoice-dialog/waiting-invoice-dialog.component';

@Component({
  selector: 'app-waiting-invoice',
  templateUrl: './waiting-invoice.component.html',
  styleUrls: ['./waiting-invoice.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class WaitingInvoiceComponent implements OnInit {

  dataSource: MatTableDataSource<Cargo>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Data:Cargo[];

  displayedColumns: string[] = ['track','name','weight','price','office','actions'];
  constructor(public languageService:LanguagesService,public service:CargoService,public dialog: MatDialog,private translate: TranslateService) {
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
  get(){
    this.service.getInvoice().subscribe(res=>{
      res.forEach(p=>{
        p.office.officeNameTranlates.forEach(pt=>{
          if(pt.languageId==this.languageService.select.id){
            p.office.officeNameTranlates[0]=pt
          }
        })
      })
      this.Data=res;
      this.dataSource = new MatTableDataSource(this.Data);
      setTimeout(() =>{
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
      });

    })
  }

  openDialogEdit(row): void {
    const dialogRefEdit = this.dialog.open(WaitingInvoiceDialogComponent, {
      width: '1000px',
      data: {row:row}
    });
    dialogRefEdit.afterClosed().subscribe(() => {
      this.get()
    });
  }
}
