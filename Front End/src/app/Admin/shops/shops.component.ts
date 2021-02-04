import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {CountryData} from '../countries-all/CountryData';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {CountryEditDialogComponent} from '../dialogs/country/country-edit-dialog/country-edit-dialog.component';
import {CountryCreateDialogComponent} from '../dialogs/country/country-create-dialog/country-create-dialog.component';
import {Shop} from '../../Core/models/Shop';
import {ShopService} from '../../Core/services/Admin/shop/shop.service';
import {ShopUpdateDialogComponent} from '../dialogs/shop/shop-update-dialog/shop-update-dialog.component';
import {ShopCreateDialogComponent} from '../dialogs/shop/shop-create-dialog/shop-create-dialog.component';

declare let Swal:any
declare let alertify:any
@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ShopsComponent implements OnInit {
  dataSource: MatTableDataSource<Shop>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  shops:Shop[];
  displayedColumns: string[] = ['name' ,'isActived','actions'];
  constructor(public service:ShopService,public dialog: MatDialog,private languageService:LanguagesService) {
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
  get(){
    this.service.get().subscribe(res=>{
      this.shops=res;
      this.dataSource = new MatTableDataSource(this.shops);
      setTimeout(()=>{
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
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
    const dialogRefEdit = this.dialog.open(ShopUpdateDialogComponent, {
      width: '450px',
      data: row
    });
    dialogRefEdit.afterClosed().subscribe(() => {
      this.get()
    });
  }
  openDialogCreate(): void {
    const dialogRefCreate = this.dialog.open(ShopCreateDialogComponent, {
      width: '450px',
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.get()
    });
  }
}
