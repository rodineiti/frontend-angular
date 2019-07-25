import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { BillReceivesService } from './../services/bill-receives.service';

@Component({
  selector: 'app-bill-receives',
  templateUrl: './bill-receives.component.html',
  styleUrls: ['./bill-receives.component.css']
})
export class BillReceivesComponent implements OnInit {

  displayedColumns = ['id', 'date_launch', 'name', 'value', 'actions'];
  dataSource: any;

  form: any = {
    date_launch: null,
    name: null,
    value: null
  };

  idReceive: Number = null;

  editable: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bill_receive: BillReceivesService) { }

  ngOnInit() {
    this.getBillReceives();
  }

  getBillReceives() {
    this.bill_receive.index()
          .then((res) => {
            this.dataSource = res.data;
            this.dataSource.paginator = this.paginator;
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {

          });
  }

  save(event) {
    event.preventDefault();
    if (this.form.category_id !== null && this.form.date_launch !== null && this.form.name !== null && this.form.value !== null){
      this.bill_receive.store(this.form)
          .then((res) => {
            console.log(res);
            this.reset();
            this.editable = false;
            this.getBillReceives();
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }

  edit(event, id : Number) {
    event.preventDefault();
    this.bill_receive.show(id)
          .then((res) => {
            console.log(res);
            this.idReceive = res.data.id;
            this.form.date_launch = res.data.date_launch;
            this.form.name = res.data.name;
            this.form.value = res.data.value;
            this.editable = true;
          })
          .catch((err) => {
            console.log(err);
            this.editable = false;
          });
  }

  update(event) {
    event.preventDefault();
    if (this.form.category_id !== null && this.form.date_launch !== null && this.form.name !== null && this.form.value !== null && this.idReceive !== null){
      this.bill_receive.update(this.form, this.idReceive)
          .then((res) => {
            console.log(res);
            this.reset();
            this.editable = false;
            this.getBillReceives();
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }
  
  del(event, id : Number) {
    event.preventDefault();
    this.bill_receive.destroy(id)
          .then((res) => {
            console.log(res);
            this.reset();
            this.editable = false;
            this.getBillReceives();
          })
          .catch((err) => {
            console.log(err);
          });
  }

  reset() {
    this.form.date_launch = null;
    this.form.name = null;
    this.form.value = null;
    this.idReceive = null
  }

}
