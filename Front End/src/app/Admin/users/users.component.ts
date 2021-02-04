import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {UserData} from './UserData';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {MatDialog} from '@angular/material/dialog';
import {RoleDialogComponent} from '../dialogs/auth/role-dialog/role-dialog.component';
import {ResetDialogComponent} from '../dialogs/auth/reset-dialog/reset-dialog.component';
import {InfoDialogComponent} from '../dialogs/auth/info-dialog/info-dialog.component';
import {InfoBusinessDialogComponent} from '../dialogs/auth/info-business-dialog/info-business-dialog.component';
import {UsersService} from '../../Core/services/Admin/users/users.service';
declare let alertify:any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  usersData:UserData[];
  displayedColumns: string[] = ['camexId', 'email', 'phoneNumber','roles','isActived','actions'];
  constructor(private service:UsersService,private languageService:LanguagesService,public dialog: MatDialog) {
    this.getUsers();
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue==''){
      this.getUsers()
      return
    }
    const body = {
      "id":filterValue
    }
    this.service.search(body).subscribe(res=>{
      this.usersData=res;
      this.dataSource = new MatTableDataSource(this.usersData);
      setTimeout(()=>{
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

    })
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getUsers(){
    this.service.getUsers().subscribe(res=>{
      this.usersData=res;
      this.dataSource = new MatTableDataSource(this.usersData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ChangeRole(str){
    const body = {
      "str":str
    }
    this.service.ChangeRole(body).subscribe(
      ()=> {
        this.getUsers();
      },
      error => {
        error.error.messages.forEach(e=>{
          if(e.lang_id==this.languageService.select.id){
            alertify.error(e.messageLang);
          }
        })
      })
  }
  openDialogRole(str:string[],id:string): void {
    const dialogRef = this.dialog.open(RoleDialogComponent, {
      width: '350px',
      data: {str:str,id:id}
    });

    dialogRef.afterClosed().subscribe(result => {
     this.getUsers()
    });
  }

  openDialogReset(id:string): void {
    const dialogRef = this.dialog.open(ResetDialogComponent, {
      width: '350px',
      data: {id:id}
    });
  }
  openDialogInfo(id:string,roles:string[]): void {
    roles.forEach(r=>
    {
      if(r=="PrivateCustomer"){
        const dialogRef = this.dialog.open(InfoDialogComponent, {
          width: '70%',
          data: {id:id}
        });
      }
      else if(r=="BusinessCustomer"){
        const dialogRef = this.dialog.open(InfoBusinessDialogComponent, {
          width: '70%',
          data: {id:id}
        });
      }
    })
  }
}
