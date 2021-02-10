import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material/dialog';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {News} from '../../Core/models/News';
import {NewsService} from '../../Core/services/Admin/news/news.service';
import {UpdateNewsComponent} from '../dialogs/news/update-news/update-news.component';
import {CreateNewsComponent} from '../dialogs/news/create-news/create-news.component';

declare let alertify:any
declare let Swal:any
@Component({
  selector: 'app-news-admin',
  templateUrl: './news-admin.component.html',
  styleUrls: ['./news-admin.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class NewsAdminComponent implements OnInit {

  dataSource: MatTableDataSource<News>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  news:News[];
  displayedColumns: string[] = ['title','createdDate' ,'isActived','actions'];
  constructor(public service:NewsService,private translate: TranslateService,public dialog: MatDialog,private languageService:LanguagesService) {
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
      this.news=res;
      this.dataSource = new MatTableDataSource( this.news);
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

    const dialogRefEdit = this.dialog.open(UpdateNewsComponent, {
      width: '1050px',
      data:  row
    });
    dialogRefEdit.afterClosed().subscribe(() => {
      this.get()
    });
  }
  openDialogCreate(): void {
    const dialogRefCreate = this.dialog.open(CreateNewsComponent, {
      width: '1050px',
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.get()
    });
  }

}
