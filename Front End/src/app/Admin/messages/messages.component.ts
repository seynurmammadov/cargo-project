import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material/dialog';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {CountryData} from '../countries-all/CountryData';
import {CourierUpdateComponent} from '../dialogs/courier/courier-update/courier-update.component';
import {MessageUser} from '../../Core/models/MessageUser';
import {MessageService} from '../../Core/services/message/message.service';
import {AnswerUserComponent} from '../dialogs/answer-user/answer-user.component';

declare let alertify:any
declare let Swal:any
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class MessagesComponent implements OnInit {

  dataSource: MatTableDataSource<MessageUser>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  MessagesUsers:MessageUser[];
  displayedColumns: string[] = ['fullname','phoneNumber','camexId','isAnswered','actions'];
  constructor(public service:MessageService,private translate: TranslateService,public dialog: MatDialog,private languageService:LanguagesService) {
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
      this.MessagesUsers=res;
      this.dataSource = new MatTableDataSource( this.MessagesUsers);
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
  openDialogAnswer(row:CountryData): void {

    const dialogRefEdit = this.dialog.open(AnswerUserComponent, {
      width: '550px',
      data:  row
    });
    dialogRefEdit.afterClosed().subscribe(() => {
      this.get()
    });
  }
}
