import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Office} from '../../Core/models/Office';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {CityService} from '../../Core/services/Admin/city/city.service';
import {City} from '../../Core/models/City';
import {CreateCityComponent} from '../dialogs/city/create-city/create-city.component';
import {UpdateCityComponent} from '../dialogs/city/update-city/update-city.component';

declare let alertify:any
declare let Swal:any
@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class CitiesComponent implements OnInit {

  dataSource: MatTableDataSource<City>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cityData:City[];
  displayedColumns: string[] = ['name','isActived','actions'];
  constructor(public service:CityService,public dialog: MatDialog,private languageService:LanguagesService,) {
    this.getCities()
  }
  getCities(){
    this.service.getCities().subscribe(res=>{
      this.cityData=res;
      this.dataSource = new MatTableDataSource(this.cityData);
      setTimeout(()=>{
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }
  openDialogCreate(): void {
    const dialogRefCreate = this.dialog.open(CreateCityComponent, {
      width: '450px',
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.getCities()
    });
  }
  openDialogEditOffice(row:Office): void {
    const dialogRefEdit = this.dialog.open(UpdateCityComponent, {
      width: '450px',
      data: {row:row}
    });
    dialogRefEdit.afterClosed().subscribe(() => {
      this.getCities()
    });
  }
  deleteCity(id:number){
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
        this.service.deleteCity(id).subscribe(
          ()=> {
            this.getCities()
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
