import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Cargo} from '../../Core/models/Cargo';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CargoService} from '../../Core/services/cargo/cargo.service';
import {MatDialog} from '@angular/material/dialog';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {UserOrderService} from '../../Core/services/Admin/userOrder/user-order.service';
import {ActivatedRoute} from '@angular/router';
import {StatusChangeComponent} from '../dialogs/status-change/status-change.component';
import {ParcelInfoComponent} from '../dialogs/parcel-info/parcel-info.component';
@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.component.html',
  styleUrls: ['./parcels.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ParcelsComponent implements OnInit {
  userId:number=0;
  val:string
  dataSource: MatTableDataSource<Cargo>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  data:Cargo[];
  displayedColumns: string[] = ['track','name','product','actions'];
  constructor(public service:CargoService,
              public dialog: MatDialog,
              private languageService:LanguagesService,
              private serviceOrder:UserOrderService,
              private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe(param=>{
      this.userId=param.id
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
    this.activatedRoute.data.subscribe(v =>this.val=v["status"]);
    this.get()
  }
  loaded:boolean=false
  get(){
    if(this.userId==undefined){
      this.service.get(this.val).subscribe(res=>{
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
    else {
      this.service.getUserId(this.val,this.userId).subscribe(res=>{
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

  openDialogStatus(row){
    if (this.val != 'End'){
      const dialogRefCreate = this.dialog.open(StatusChangeComponent, {
        width: '1050',
        data: row
      });
      dialogRefCreate.afterClosed().subscribe(() => {
        this.get()
      });
    }

  }

  checkStatus(name){
    if (name == 'End'){
      return true
    }
    return false;
  }

  openDialogInfo(id){
    const dialogRef = this.dialog.open(ParcelInfoComponent, {
      width: '1050px',
      data: {id:id}
    });
  }
}
