import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import {StatementDialogComponent} from '../dialogs/statement-dialog/statement-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {CountryData} from '../../Admin/countries-all/CountryData';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {StatementUpdateComponent} from '../dialogs/statement-update/statement-update.component';
import {StatementService} from '../../Core/services/statement/statement.service';
import {Cargo} from '../../Core/models/Cargo';
import {AppUser} from '../../Admin/Models/AppUser';
import {LanguagesService} from '../../Core/services/lang/languages.service';
declare let alertify:any
declare let Swal:any
@Component({
  selector: 'app-statements',
  templateUrl: './statements.component.html',
  styleUrls: ['./statements.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class StatementsComponent implements OnInit,OnChanges {
  dataSource: MatTableDataSource<Cargo>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() user:AppUser;
  @Output() event = new EventEmitter();
  callParent(): void {
    this.event.next();
  }
  displayedColumns: string[] = ['track','name','product','actions'];
  constructor(public languageService:LanguagesService,public service:StatementService,public dialog: MatDialog) {
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
      this.dataSource = new MatTableDataSource(this.user.cargos);
       setTimeout(() => this.dataSource.paginator = this.paginator);
      this.dataSource.sort = this.sort;
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
            this.callParent()
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
      this.callParent()
    });
  }
  openDialogCreate(): void {
    const dialogRefCreate = this.dialog.open(StatementDialogComponent, {
      width: '1000px',
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.callParent()
    });
  }
}
