import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {OfficeService} from '../../Core/services/Admin/office/office.service';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {Office} from '../../Core/models/Office';
import {CreateOfficeComponent} from '../dialogs/office/create-office/create-office.component';
import {UpdateOfficeComponent} from '../dialogs/office/update-office/update-office.component';

declare let alertify:any
declare let Swal:any
@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class OfficesComponent implements OnInit {

  dataSource: MatTableDataSource<Office>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  countryData:Office[];
  displayedColumns: string[] = ['name', 'value','isActived','actions'];
  constructor(public service:OfficeService,public dialog: MatDialog,private languageService:LanguagesService,) {
    this.getOffices()
  }

  getOffices(){
    this.service.getOffices().subscribe(res=>{
      this.countryData=res;
      this.dataSource = new MatTableDataSource(this.countryData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  openDialogCreate(): void {
    const dialogRefCreate = this.dialog.open(CreateOfficeComponent, {
      width: '450px',
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.getOffices()
    });
  }
  openDialogEditOffice(row:Office): void {
    const dialogRefEdit = this.dialog.open(UpdateOfficeComponent, {
      width: '450px',
      data: {row:row}
    });
    dialogRefEdit.afterClosed().subscribe(() => {
      this.getOffices()
    });
  }
  deleteOffice(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.service.deleteOffice(id).subscribe(
          ()=> {
            this.getOffices()
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