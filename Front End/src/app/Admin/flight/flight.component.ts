import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material/dialog';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {Flight} from '../../Core/models/Flight';
import {FlightService} from '../../Core/services/Admin/flight/flight.service';
import {UpdateFlightComponent} from '../dialogs/flight/update-flight/update-flight.component';
import {CreateFlightComponent} from '../dialogs/flight/create-flight/create-flight.component';

declare let alertify:any
declare let Swal:any
@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class FlightComponent implements OnInit {
  dataSource: MatTableDataSource<Flight>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  flights:Flight[];
  displayedColumns: string[] = ['from','to','landingDate' ,'isActived','actions'];
  constructor(public service:FlightService,private translate: TranslateService,public dialog: MatDialog,private languageService:LanguagesService) {
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
      this.flights=res;
      this.dataSource = new MatTableDataSource( this.flights);
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
  openDialogEdit(row): void {

    const dialogRefEdit = this.dialog.open(UpdateFlightComponent, {
      width: '550px',
      data:  row
    });
    dialogRefEdit.afterClosed().subscribe(() => {
      this.get()
    });
  }
  openDialogCreate(): void {
    const dialogRefCreate = this.dialog.open(CreateFlightComponent, {
      width: '550px',
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.get()
    });
  }
}
