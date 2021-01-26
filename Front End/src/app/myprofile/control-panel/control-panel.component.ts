import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
export interface UserPaymentData {
  name: string;
  value: string;
  date: string;
}
@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit,AfterViewInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  limit:string= ((150*100)/300).toString();
  youLimit:number;
  displayedColumns: string[] = ['name', 'value', 'date'];
  dataSource: MatTableDataSource<UserPaymentData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  usersPaymentData:UserPaymentData[]
  constructor() {
    this.youLimit= 150
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
    this.usersPaymentData=[
      {
        name:"aa",
        value:"100",
        date:"mondayy"
      }
    ]
    this.dataSource = new MatTableDataSource(this.usersPaymentData);

  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  srcImg:string="../../assets/image/manat.jpg"
}
