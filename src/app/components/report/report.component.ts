import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { AuthService } from 'src/app/services/auth.service';
Chart.register(...registerables);
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{

  chartdata: any;
  @Input() data: any = [];
  Highcharts= Highcharts;
  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];
  chartOptions!: {};
  usrTenantId:any
  constructor( private auth:AuthService){}
  ngOnInit(): void {
    this.usrTenantId=localStorage.getItem("TenantId")
    this.auth.GetUserDataByTenantId(this.usrTenantId)
    .subscribe(res=>{
      this.chartdata = res.invoiceDetails;
      if(this.chartdata!=null){
        for(let i=0; i<this.chartdata.length ;i++){
          //console.log(this.chartdata[i]);
          this.labeldata.push(this.chartdata[i].totalHours);
          this.realdata.push(this.chartdata[i].cost);
          this.colordata.push(this.chartdata[i].colorcode);
        }
        this.RenderChart(this.labeldata,this.realdata,this.colordata,'bar','barchart');
       // this.RenderChart(this.labeldata,this.realdata,this.colordata,'pie','piechart');
        //this.RenderChart(this.labeldata,this.realdata,this.colordata,'doughnut','dochart');
        //this.RenderChart(this.labeldata,this.realdata,this.colordata,'polarArea','pochart');

        //this.RenderChart(this.labeldata,this.realdata,this.colordata,'radar','rochart');
        //this.renderpiechart();
        
      }
    });
    this.RenderBubblechart();
    this.RenderScatterchart();
    this.chartOptions = {
      chart: {
          type: 'area'
      },
      title: {
          text: 'Greenhouse gases from Norwegian economic activity',
          align: 'left'
      },
  
      yAxis: {
          title: {
              useHTML: true,
              text: 'Million tonnes CO<sub>2</sub>-equivalents'
          }
      },
      tooltip: {
          shared: true,
          headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>'
      },
      plotOptions: {
          series: {
              pointStart: 2012
          },
          area: {
              stacking: 'normal',
              lineColor: '#666666',
              lineWidth: 1,
              marker: {
                  lineWidth: 1,
                  lineColor: '#666666'
              }
          }
      },
      series: [{
          name: 'Ocean transport',
          data: [13234, 12729, 11533, 17798, 10398, 12811, 15483, 16196, 16214]
      }, {
          name: 'Households',
          data: [6685, 6535, 6389, 6384, 6251, 5725, 5631, 5047, 5039]
  
      }, {
          name: 'Agriculture and hunting',
          data: [4752, 4820, 4877, 4925, 5006, 4976, 4946, 4911, 4913]
      }, {
          name: 'Air transport',
          data: [3164, 3541, 3898, 4115, 3388, 3569, 3887, 4593, 1550]
  
      }, {
          name: 'Construction',
          data: [2019, 2189, 2150, 2217, 2175, 2257, 2344, 2176, 2186]
      }]
  }

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  RenderChart(labeldata:any,maindata:any,colordata:any,type:any,id:any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [{
          label: '# of Cost per Hour',
          data: maindata,
          backgroundColor: this.getRandomColor(),
          borderColor: this.getRandomColor(),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    


  }
  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
  RenderBubblechart(){
    const data = {
      datasets: [{
        label: 'First Dataset',
        data: [{
          x: 20,
          y: 30,
          r: 15
        }, {
          x: 40,
          y: 10,
          r: 10
        }],
        backgroundColor: this.getRandomColor()
      }]
    };
    const myChart = new Chart('bubchart', {
      type: 'bubble',
      data: data,
      options: {
        
      }
    });
  }

  RenderScatterchart(){
    const data = {
      datasets: [{
        label: 'Scatter Dataset',
        data: [{
          x: -10,
          y: 0
        }, {
          x: 0,
          y: 10
        }, {
          x: 10,
          y: 5
        }, {
          x: 0.5,
          y: 5.5
        }],
        backgroundColor: this.getRandomColor()
      }],
    };
    const myChart = new Chart('scchart', {
      type: 'scatter',
      data: data,
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          }
        }
      }
    });
  }
//   renderpiechart(){
//   this.chartOptions = {
//   chart: {
//     plotBackgroundColor: null,
//     plotBorderWidth: null,
//     plotShadow: false,
//     type: 'pie'
// },
// title: {
//     text: 'Browser market shares in May, 2020',
//     align: 'left'
// },
// tooltip: {
//     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
// },
// accessibility: {
//     point: {
//         valueSuffix: '%'
//     }
// },
// plotOptions: {
//     pie: {
//         allowPointSelect: true,
//         cursor: 'pointer',
//         dataLabels: {
//             enabled: true,
//             format: '<b>{point.name}</b>: {point.percentage:.1f} %'
//         }
//     }
// },
// series: [{
//     name: 'Brands',
//     colorByPoint: true,
//     data: [{
//         name: 'Chrome',
//         y: 70.67,
//         sliced: true,
//         selected: true
//     }, {
//         name: 'Edge',
//         y: 14.77
//     },  {
//         name: 'Firefox',
//         y: 4.86
//     }, {
//         name: 'Safari',
//         y: 2.63
//     }, {
//         name: 'Internet Explorer',
//         y: 1.53
//     },  {
//         name: 'Opera',
//         y: 1.40
//     }, {
//         name: 'Sogou Explorer',
//         y: 0.84
//     }, {
//         name: 'QQ',
//         y: 0.51
//     }, {
//         name: 'Other',
//         y: 2.6
//     }]
// }]
// }
// } 

}
