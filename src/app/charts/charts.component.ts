import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { Highcharts  } from 'angular-highcharts'; 

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  categories: any;
  
  form: any = {
    dateStart: null,
    dateEnd: null
  };

  isResults: boolean = false;

  constructor(private report: ReportService) { }

  ngOnInit() {
    //this.getChart();
  }

  submit(event) {
    event.preventDefault();
    if (this.form.dateStart !== null && this.form.dateEnd !== null){
      this.report.sumChartsByPeriod(this.form)
          .then((res) => {
            this.categories = res.data;
            this.getChart(this.categories);
            this.isResults = true;
          })
          .catch((err) => {
            console.log(err);
            this.isResults = false;
          });
    }
  }

  getChart(dados: any){
    // Build the chart
    Highcharts.chart('container', <any> {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: 'Gráfico por período'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.y:.2f}</b>'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: false
              },
              showInLegend: true
          }
      },
      series: [{
          name: 'Brands',
          colorByPoint: true,
          data: dados
      }]
    });
  }

}
