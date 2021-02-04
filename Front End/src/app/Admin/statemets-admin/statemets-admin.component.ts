import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {OrderInfoComponent} from '../dialogs/order/order-info/order-info.component';
import {Cargo} from '../../Core/models/Cargo';
import {CargoService} from '../../Core/services/cargo/cargo.service';
import {AddStatementToAnbarComponent} from '../dialogs/add-statement-to-anbar/add-statement-to-anbar.component';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-statemets-admin',
  templateUrl: './statemets-admin.component.html',
  styleUrls: ['./statemets-admin.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class StatemetsAdminComponent implements OnInit {


  dataSource: MatTableDataSource<Cargo>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  data:Cargo[];

  userId:number=0;
  displayedColumns: string[] = ['track','name','product','actions'];
  constructor(public service:CargoService,
              public dialog: MatDialog,
              private languageService:LanguagesService,
              private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe(param=>{
      this.userId=param.id
    })
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
  loaded:boolean=false
  get(){if(this.userId==undefined){
    this.service.get("Statement").subscribe(res=>{
      this.data=res;
      this.dataSource = new MatTableDataSource(this.data);
      this.loaded=true
      setTimeout(() => {
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort;
        }
      )

    })
  }
  else{
    this.service.getWithId(this.userId).subscribe(res=>{
      this.data=res;
      this.dataSource = new MatTableDataSource(this.data);
      this.loaded=true
      setTimeout(() => {
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort;
        }
      )

    })
  }
  }
  openDialogInfo(row): void {
    this.dialog.open(OrderInfoComponent, {
      width: '1050px',
      data: {row:row}
    });
  }

  openDialogAdd(row){
    const dialogRefCreate = this.dialog.open(AddStatementToAnbarComponent, {
      width: '1050',
      data: row
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.get()
    });
  }

}
