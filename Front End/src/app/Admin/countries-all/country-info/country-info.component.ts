import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {CountryInfoData} from './CountryInfoData';
import {CountryData} from '../CountryData';
import {ActivatedRoute} from '@angular/router';
import {CountryInfoCreateComponent} from '../../dialogs/country/country-info-create/country-info-create.component';
import {CountryInfoEditComponent} from '../../dialogs/country/country-info-edit/country-info-edit.component';
import {CountryInfoService} from '../../../Core/services/Admin/countries/country-info.service';
import {LanguagesService} from '../../../Core/services/lang/languages.service';

declare let alertify:any;
declare let Swal:any
@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class CountryInfoComponent implements OnInit {

  dataSource: MatTableDataSource<CountryInfoData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  countryData:CountryData;
  countryId:number;
  displayedColumns: string[] = ['title','description','actions'];
  constructor(public service:CountryInfoService,public dialog: MatDialog,private languageService:LanguagesService, private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe(param=>{
      this.countryId=param.id
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
    this.getCountry()
  }
  loaded:boolean=false
  getCountry(){
    this.service.getCountry(this.countryId).subscribe(res=>{
      this.countryData=res;
      this.dataSource = new MatTableDataSource(this.countryData.countryAddressDescriptions);
      this.loaded=true
      setTimeout(() =>{
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
      } )
    })
  }
  openDialogCreate(): void {
    const dialogRefCreate = this.dialog.open(CountryInfoCreateComponent, {
      width: '450px',
      data: this.countryId
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.getCountry()
    });
  }
  openDialogEdit(row): void {
    const dialogRefCreate = this.dialog.open(CountryInfoEditComponent, {
      width: '450px',
      data: {row:row,countryId:this.countryId}
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.getCountry()
    });
  }
  deleteCountryInfo(id:number) {
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
        this.service.deleteCountryInfo(id).subscribe(
          () => {
            this.getCountry()
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
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44387/Site/images/countries/${serverPath}`;
  }
}
