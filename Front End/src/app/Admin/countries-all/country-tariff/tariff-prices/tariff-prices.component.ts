import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Tariff} from '../../../../Core/models/Tariff';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {TariffService} from '../../../../Core/services/Admin/countries/tariff/tariff.service';
import {MatDialog} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {ActivatedRoute} from '@angular/router';
import {PriceList} from '../../../../Core/models/PriceList';
import {PriceService} from '../../../../Core/services/Admin/countries/tariff/price.service';
import {PriceUpdateComponent} from '../../../dialogs/country/price-update/price-update.component';
import {PriceCreateComponent} from '../../../dialogs/country/price-create/price-create.component';

declare let alertify:any
declare let Swal:any
@Component({
  selector: 'app-tariff-prices',
  templateUrl: './tariff-prices.component.html',
  styleUrls: ['./tariff-prices.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class TariffPricesComponent implements OnInit {

  dataSource: MatTableDataSource<PriceList>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  data:PriceList[];
  tariffId:number;
  tariff:Tariff
  displayedColumns: string[] = ['min','max','price','actions'];
  constructor(public serviceTariff:TariffService,private service:PriceService,public dialog: MatDialog,private languageService:LanguagesService, private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe(param=>{
      this.tariffId=param.id

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
    this.serviceTariff.getWithId(this.tariffId).subscribe(res=>{
      this.tariff=res;
    })
    this.service.get(this.tariffId).subscribe(res=>{
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
    const dialogRefCreate = this.dialog.open(PriceCreateComponent, {
      width: '450px',
      data: this.tariffId
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.get()
    });
  }
  openDialogEdit(row): void {
    const dialogRefCreate = this.dialog.open(PriceUpdateComponent, {
      width: '450px',
      data: {row:row,tariffId:this.tariffId}
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
