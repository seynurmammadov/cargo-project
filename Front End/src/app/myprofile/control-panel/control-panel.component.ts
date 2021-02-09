import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {
  ApexChart,
  ApexFill,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexStates,
  ApexStroke,
  ApexTooltip,
  ChartComponent
} from 'ng-apexcharts';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {AppUser} from '../../Admin/Models/AppUser';
import {Receipt} from '../../Core/models/Receipt';
import {MatDialog} from '@angular/material/dialog';
import {BalanceDialogComponent} from '../dialogs/balance-dialog/balance-dialog.component';
import {CargoService} from '../../Core/services/cargo/cargo.service';
import {Cargo} from '../../Core/models/Cargo';
import {LanguagesService} from '../../Core/services/lang/languages.service';
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
  states:ApexStates,
  tooltip:ApexTooltip
};

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit,OnChanges {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  Data:Cargo[];
  youLimit:number=0;
  limit:string;

  displayedColumns: string[] = ['name', 'value', 'createdDate'];
  dataSource: MatTableDataSource<Receipt>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() user:AppUser;
  @Output() event = new EventEmitter();
  callParent(): void {
    this.event.next();
  }
  ngOnChanges(changes:SimpleChanges) {
    this.user= changes.user.currentValue
    this.get()
  }
  constructor(public dialog: MatDialog,
              public languageService:LanguagesService,
              public service:CargoService) {
  }
  ngOnInit(): void {
    this.get()


  }
loaded:boolean=false
  get(){
    this.dataSource = new MatTableDataSource(this.user.receipts);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
    });
    this.service.getEnded().subscribe(res=>{
      this.Data=res;
      this.youLimit=0
      if(this.Data[0].createdDate!=undefined){
        this.Data.forEach(data=>{
          let today = new Date()
          let day = new Date(data.createdDate )
          if(today.getTime()-day.getTime()<2.628e+9){
            this.youLimit+=data.price
          }
        })

      }
      this.limit= ((this.youLimit*100)/300).toString()
      this.chartOptions = {
        series: [parseInt(this.limit)],
        chart: {
          height: 200,
          type: "radialBar",
          toolbar: {
            show: false
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: 0,
            endAngle: 360,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -1,
                left: 0,
                blur: 4,
                opacity: 0.1
              }
            },
            dataLabels: {
              show: true,
              name: {
                show: false,
              },
              value: {
                formatter(val: number): string {
                  return val.toString()+"%"
                },
                color: "#111",
                fontSize: "36px",
                show: true
              },

            }
          }
        },

        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#ABE5A1"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: "round"
        },
        states:{
          normal: {
            filter: {
              type: 'none',
              value: 0,
            }
          },
          hover: {
            filter: {
              type: 'none',
              value: 0,
            }
          },
          active: {
            allowMultipleDataPointsSelection: false,
            filter: {
              type: 'none',
              value: 0,
            }
          },
        }
      };
      this.loaded=true
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  srcImg:string="../../assets/image/manat.jpg"
  getCamexId(val){
    return String(val).padStart(5, '0')
  }
  openDialog(){
    const dialogRefCreate = this.dialog.open(BalanceDialogComponent, {
      width: '450px',
    });
    dialogRefCreate.afterClosed().subscribe(() => {
      this.callParent()
    });
  }
}
