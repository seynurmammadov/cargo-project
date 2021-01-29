import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {StatementDialogComponent} from '../dialogs/statement-dialog/statement-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {CountryData} from '../../Admin/countries-all/CountryData';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {StatementUpdateComponent} from '../dialogs/statement-update/statement-update.component';
import {StatementService} from '../../Core/services/statement/statement.service';
import {Cargo} from '../../Core/models/Cargo';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
declare let alertify:any
declare let Swal:any
@Component({
  selector: 'app-statements',
  templateUrl: './statements.component.html',
  styleUrls: ['./statements.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class StatementsComponent implements OnInit {
  dataSource: MatTableDataSource<Cargo>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Data:Cargo[];
  displayedColumns: string[] = ['track','name','product','actions'];
  constructor(public service:StatementService,public dialog: MatDialog,private languageService:LanguagesService,    private translate: TranslateService,) {
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
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.get()
    });
  }
  get(){
    this.service.get().subscribe(res=>{
      res.forEach(p=>{
        p.product.productTranslates.forEach(pt=>{
          if(pt.languageId==this.languageService.select.id){
            p.product.productTranslates[0]=pt
            this.Data=res;
          }
        })
      })
      this.dataSource = new MatTableDataSource(this.Data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  delete(id:number){
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
        this.service.delete(id).subscribe(
          ()=> {
            this.get()
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

  openDialogEdit(row:CountryData): void {
    const dialogRefEdit = this.dialog.open(StatementUpdateComponent, {
      width: '1000px',
      data: {row:row}
    });
    dialogRefEdit.afterClosed().subscribe(() => {
      this.get()
    });
  }
  openDialogCreate(): void {
    const dialogRefCreate = this.dialog.open(StatementDialogComponent, {
      width: '1000px',
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.get()
    });
  }
}
