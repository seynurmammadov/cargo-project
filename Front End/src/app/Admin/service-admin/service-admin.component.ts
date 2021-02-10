import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {FaqService} from '../../Core/services/Admin/faq/faq.service';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material/dialog';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {CountryData} from '../countries-all/CountryData';
import {FaqUpdateComponent} from '../dialogs/faq/faq-update/faq-update.component';
import {FaqCreateComponent} from '../dialogs/faq/faq-create/faq-create.component';
import {Service} from '../../Core/models/Service';
import {ServiceService} from '../../Core/services/Admin/service/service.service';
import {ServiceCreateComponent} from '../dialogs/service/service-create/service-create.component';
import {ServiceUpdateComponent} from '../dialogs/service/service-update/service-update.component';
declare let Swal:any
declare let alertify:any
@Component({
  selector: 'app-service-admin',
  templateUrl: './service-admin.component.html',
  styleUrls: ['./service-admin.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ServiceAdminComponent implements OnInit {

  dataSource: MatTableDataSource<Service>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  services:Service[];
  displayedColumns: string[] = ['name','isActived','actions'];
  constructor(public service:ServiceService,private translate: TranslateService,public dialog: MatDialog,private languageService:LanguagesService) {

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
      this.services=res;
      this.dataSource = new MatTableDataSource( this.services);
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

    const dialogRefEdit = this.dialog.open(ServiceUpdateComponent, {
      width: '1050px',
      data:  row
    });
    dialogRefEdit.afterClosed().subscribe(() => {
      this.get()
    });
  }
  openDialogCreate(): void {
    const dialogRefCreate = this.dialog.open(ServiceCreateComponent, {
      width: '1050px',
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.get()
    });
  }


}
