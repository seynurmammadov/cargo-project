import {Component,  OnInit,  ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Cargo} from '../../Core/models/Cargo';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {CargoService} from '../../Core/services/cargo/cargo.service';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-ended',
  templateUrl: './ended.component.html',
  styleUrls: ['./ended.component.scss']
})
export class EndedComponent implements OnInit {

  dataSource: MatTableDataSource<Cargo>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Data:Cargo[];
  displayedColumns: string[] = ['track','name','weight','price','office'];
  constructor(
    public languageService:LanguagesService,
    public service:CargoService,
    private translate: TranslateService) {
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
    this.translate.onLangChange.subscribe(() => {
      this.get()
    });
  }
  loaded:boolean=false
  get(){
    this.service.getEnded().subscribe(res=>{
      res.forEach(p=>{
        p.office.officeNameTranlates.forEach(pt=>{
          if(pt.languageId==this.languageService.select.id){
            p.office.officeNameTranlates[0]=pt
          }
        })
      })
      this.Data=res;
      this.dataSource = new MatTableDataSource(this.Data);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
      });

      this.loaded=true
    })
  }





}
