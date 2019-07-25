import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { CategoriesService } from './../services/categories.service';
import { BillPaysService } from './../services/bill-pays.service';

@Component({
  selector: 'app-bill-pays',
  templateUrl: './bill-pays.component.html',
  styleUrls: ['./bill-pays.component.css']
})
export class BillPaysComponent implements OnInit {

  displayedColumns = ['id', 'date_launch', 'name', 'value', 'category.name', 'actions'];
  dataSource: any;
  categories: any;

  form: any = {
    category_id: null,
    date_launch: null,
    name: null,
    value: null
  };

  idPay: Number = null;

  editable: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bill_pay: BillPaysService, private category: CategoriesService) { }

  ngOnInit() {
    this.getCategories();
    this.getBillPays();
  }

  getCategories() {
    this.category.index()
          .then((res) => {
            this.categories = res.data;
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {

          });
  }

  getBillPays() {
    this.bill_pay.index()
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
    console.log(this.form);
    if (this.form.category_id !== null && this.form.date_launch !== null && this.form.name !== null && this.form.value !== null){
      this.bill_pay.store(this.form)
          .then((res) => {
            console.log(res);
            this.reset();
            this.editable = false;
            this.getBillPays();
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }

  edit(event, id : Number) {
    event.preventDefault();
    this.bill_pay.show(id)
          .then((res) => {
            console.log(res);
            this.idPay = res.data.id;
            this.form.category_id = res.data.category_id;
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
    if (this.form.category_id !== null && this.form.date_launch !== null && this.form.name !== null && this.form.value !== null && this.idPay !== null){
      this.bill_pay.update(this.form, this.idPay)
          .then((res) => {
            console.log(res);
            this.reset();
            this.editable = false;
            this.getBillPays();
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }
  
  del(event, id : Number) {
    event.preventDefault();
    this.bill_pay.destroy(id)
          .then((res) => {
            console.log(res);
            this.reset();
            this.editable = false;
            this.getBillPays();
          })
          .catch((err) => {
            console.log(err);
          });
  }

  reset() {
    this.form.category_id = null;
    this.form.date_launch = null;
    this.form.name = null;
    this.form.value = null;
    this.idPay = null
  }

}
