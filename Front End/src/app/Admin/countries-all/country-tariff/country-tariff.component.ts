import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CountryData} from '../CountryData';
import {CountryInfoService} from '../../../Core/services/Admin/countries/country-info.service';
import {MatDialog} from '@angular/material/dialog';
import {LanguagesService} from '../../../Core/services/lang/languages.service';
import {ActivatedRoute} from '@angular/router';
import {Tariff} from '../../../Core/models/Tariff';
import {TariffService} from '../../../Core/services/Admin/countries/tariff/tariff.service';
import {TariffCreateComponent} from '../../dialogs/country/tariff-create/tariff-create.component';
import {TariffUpdateComponent} from '../../dialogs/country/tariff-update/tariff-update.component';

declare let alertify:any;
declare let Swal:any
@Component({
  selector: 'app-country-tariff',
  templateUrl: './country-tariff.component.html',
  styleUrls: ['./country-tariff.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class CountryTariffComponent implements OnInit {

  dataSource: MatTableDataSource<Tariff>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  data:Tariff[];
  countryId:number;
  country:CountryData
  displayedColumns: string[] = ['to','actions'];
  constructor(public serviceCountry:CountryInfoService,private service:TariffService,public dialog: MatDialog,private languageService:LanguagesService, private activatedRoute:ActivatedRoute) {
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
    this.get()
  }
  loaded:boolean=false
  get(){
    this.serviceCountry.getCountry(this.countryId).subscribe(res=>{
      this.country=res;
    })
    this.service.get(this.countryId).subscribe(res=>{
      this.data=res;
      this.dataSource = new MatTableDataSource(this.data);
      this.loaded=true
      setTimeout(() =>{
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
      } )
    })
  }
  openDialogCreate(): void {
    const dialogRefCreate = this.dialog.open(TariffCreateComponent, {
      width: '450px',
      data: this.countryId
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.get()
    });
  }
  openDialogEdit(row): void {
    const dialogRefCreate = this.dialog.open(TariffUpdateComponent, {
      width: '450px',
      data: {row:row,countryId:this.countryId}
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
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44387/Site/images/countries/${serverPath}`;
  }

}
