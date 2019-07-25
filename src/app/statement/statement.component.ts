import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {

  billPays: any = Array;
  billReceives: any = Array;
  total_pays: Number;
  total_receives: Number;

  form: any = {
    dateStart: null,
    dateEnd: null
  };

  isResults: boolean = false;

  constructor(private report: ReportService) { }

  ngOnInit() {
  }

  submit(event) {
    event.preventDefault();
    if (this.form.dateStart !== null && this.form.dateEnd !== null){
      this.report.getStatementByPeriod(this.form)
          .then((res) => {
            this.billPays = res.data.billPays;
            this.billReceives = res.data.billReceives;
            this.total_pays = res.data.total_pays;
            this.total_receives = res.data.total_receives;
            this.isResults = true;
          })
          .catch((err) => {
            console.log(err);
            this.isResults = false;
          });
    }
  }

}
