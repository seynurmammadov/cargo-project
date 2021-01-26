import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CountryData} from './CountryData';
import {CountriesService} from '../../Core/services/admin/countries/countries.service';
import {MatDialog} from '@angular/material/dialog';
import {CountryEditDialogComponent} from '../dialogs/country-edit-dialog/country-edit-dialog.component';
import {CountryCreateDialogComponent} from '../dialogs/country-create-dialog/country-create-dialog.component';

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
  displayedColumns: string[] = ['image','name', 'value' ,'isActived','actions'];
  constructor(public service:CountriesService,public dialog: MatDialog) {
    this.getCountries()
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
  getCountries(){
    this.service.getCountries().subscribe(res=>{
      this.countryData=res;
      this.dataSource = new MatTableDataSource(this.countryData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  openDialogEditCountry(row:CountryData): void {
    const dialogRef = this.dialog.open(CountryEditDialogComponent, {
      width: '70%',
      data: {row:row}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getCountries()
    });
  }
  openDialogCreate(): void {
    const dialogRef = this.dialog.open(CountryCreateDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getCountries()
    });
  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44387/Site/images/countries/${serverPath}`;
  }
}
