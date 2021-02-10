import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CountryData} from './CountryData';
import {MatDialog} from '@angular/material/dialog';
import {CountryEditDialogComponent} from '../dialogs/country/country-edit-dialog/country-edit-dialog.component';
import {CountryCreateDialogComponent} from '../dialogs/country/country-create-dialog/country-create-dialog.component';
import {CountriesService} from '../../Core/services/Admin/countries/countries.service';
import {LanguagesService} from '../../Core/services/lang/languages.service';
declare let alertify:any;
declare let Swal:any;
@Component({
  selector: 'app-countries-all',
  templateUrl: './countries-all.component.html',
  styleUrls: ['./countries-all.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class CountriesAllComponent implements OnInit {
  dataSource: MatTableDataSource<CountryData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  countryData:CountryData[];
  displayedColumns: string[] = ['image','name','wallet' ,'value' ,'isActived','actions'];
  constructor(public service:CountriesService,public dialog: MatDialog,private languageService:LanguagesService) {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
  this.getCountries()
  }
  getCountries(){
    this.service.getCountries().subscribe(res=>{
      this.countryData=res;
      this.dataSource = new MatTableDataSource(this.countryData);
     setTimeout(()=>{
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     })
    })
  }
  deleteCountry(id:number){
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
        this.service.deleteCountry(id).subscribe(
          ()=> {
            this.getCountries()
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

  openDialogEditCountry(row:CountryData): void {
    const dialogRefEdit = this.dialog.open(CountryEditDialogComponent, {
      width: '450px',
      data: {row:row}
    });
    dialogRefEdit.afterClosed().subscribe(() => {
      this.getCountries()
    });
  }
  openDialogCreate(): void {
    const dialogRefCreate = this.dialog.open(CountryCreateDialogComponent, {
      width: '450px',
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.getCountries()
    });
  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44387/Site/images/countries/${serverPath}`;
  }
}
