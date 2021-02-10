import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {LanguagesService} from '../../../Core/services/lang/languages.service';
import {ActivatedRoute} from '@angular/router';
import {ShopLink} from '../../../Core/models/ShopLink';
import {ShopLinkService} from '../../../Core/services/Admin/shop/shop-link.service';
import {Shop} from '../../../Core/models/Shop';
import {ShopLinkCreateDialogComponent} from '../../dialogs/shop/shop-link-create-dialog/shop-link-create-dialog.component';
import {ShopLinkUpdateDialogComponent} from '../../dialogs/shop/shop-link-update-dialog/shop-link-update-dialog.component';

declare let alertify:any
declare let Swal:any
@Component({
  selector: 'app-shop-link',
  templateUrl: './shop-link.component.html',
  styleUrls: ['./shop-link.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ShopLinkComponent implements OnInit {

  dataSource: MatTableDataSource<ShopLink>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  data:Shop;
  shopId:number;
  displayedColumns: string[] = ['link','actions'];
  constructor(public service:ShopLinkService,public dialog: MatDialog,private languageService:LanguagesService, private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe(param=>{
      this.shopId=param.id
    })
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
  loaded:boolean=false
  get(){
    this.service.get(this.shopId).subscribe(res=>{
      this.data=res;
      this.dataSource = new MatTableDataSource(this.data.shopLinks);
      this.loaded=true
      setTimeout(() =>
      {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      })

    })
  }
  openDialogCreate(): void {
    const dialogRefCreate = this.dialog.open(ShopLinkCreateDialogComponent, {
      width: '450px',
      data: this.shopId
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.get()
    });
  }
  openDialogEdit(row): void {
    const dialogRefCreate = this.dialog.open(ShopLinkUpdateDialogComponent, {
      width: '450px',
      data: {row:row,shopId:this.shopId}
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.get()
    });
  }
  delete(id:number) {
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
        this.service.delete(id).subscribe(
          () => {
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
}
