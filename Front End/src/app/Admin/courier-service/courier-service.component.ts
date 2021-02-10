import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material/dialog';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {CountryData} from '../countries-all/CountryData';
import {CourierLocation} from '../../Core/models/CourierLocation';
import {CourierService} from '../../Core/services/Admin/courier/courier.service';
import {CourierUpdateComponent} from '../dialogs/courier/courier-update/courier-update.component';
import {CourierCreateComponent} from '../dialogs/courier/courier-create/courier-create.component';

declare let alertify:any
declare let Swal:any
@Component({
  selector: 'app-courier-service',
  templateUrl: './courier-service.component.html',
  styleUrls: ['./courier-service.component.scss'],
  encapsulation:ViewEncapsulation.None})
export class CourierServiceComponent implements OnInit {

  dataSource: MatTableDataSource<CourierLocation>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  courierLocations:CourierLocation[];
  displayedColumns: string[] = ['name','price' ,'isActived','actions'];
  constructor(public service:CourierService,private translate: TranslateService,public dialog: MatDialog,private languageService:LanguagesService) {
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
  get(){
    this.service.get().subscribe(res=>{
     this.courierLocations=res;
      this.dataSource = new MatTableDataSource( this.courierLocations);
      setTimeout(()=>{
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }
  delete(id:number){
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

    const dialogRefEdit = this.dialog.open(CourierUpdateComponent, {
      width: '450px',
      data:  row
    });
    dialogRefEdit.afterClosed().subscribe(() => {
      this.get()
    });
  }
  openDialogCreate(): void {
    const dialogRefCreate = this.dialog.open(CourierCreateComponent, {
      width: '450px',
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.get()
    });
  }
}
