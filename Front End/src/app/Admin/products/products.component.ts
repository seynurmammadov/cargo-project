import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {Office} from '../../Core/models/Office';
import {UpdateProductComponent} from '../dialogs/product/update-product/update-product.component';
import {CreatePtoductComponent} from '../dialogs/product/create-ptoduct/create-ptoduct.component';
import {ProductService} from '../../Core/services/Admin/product/product.service';
import {Product} from '../../Core/models/Product';
declare let alertify:any
declare let Swal:any
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {


  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  productData:Product[];
  displayedColumns: string[] = ['name','isActived','actions'];
  constructor(public service:ProductService,public dialog: MatDialog,private languageService:LanguagesService,) {
    this.getProducts()
  }
  getProducts(){
    this.service.getProducts().subscribe(res=>{
      this.productData=res;
      this.dataSource = new MatTableDataSource(this.productData);
      setTimeout(()=>{
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }
  openDialogCreate(): void {
    const dialogRefCreate = this.dialog.open(CreatePtoductComponent, {
      width: '450px',
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.getProducts()
    });
  }
  openDialogEditOffice(row:Office): void {
    const dialogRefEdit = this.dialog.open(UpdateProductComponent, {
      width: '450px',
      data: {row:row}
    });
    dialogRefEdit.afterClosed().subscribe(() => {
      this.getProducts()
    });
  }
  deleteProduct(id:number){
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
        this.service.deleteProduct(id).subscribe(
          ()=> {
            this.getProducts()
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
  }
}
