import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { CategoriesService } from './../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  displayedColumns = ['id', 'name', 'created_at', 'actions'];
  dataSource: any;

  form: any = {
    name: null
  };

  idCategory: Number = null;

  editable: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private category: CategoriesService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.category.index()
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
    if (this.form.name !== null){
      this.category.store(this.form)
          .then((res) => {
            if (res.status !== 'error') {
              this.reset();
              this.editable = false;
              this.getCategories(); 
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }

  edit(event, id : Number) {
    event.preventDefault();
    this.category.show(id)
          .then((res) => {
            console.log(res);
            this.idCategory = res.data.id;
            this.form.name = res.data.name;
            this.editable = true;
          })
          .catch((err) => {
            console.log(err);
            this.editable = false;
          });
  }

  update(event) {
    event.preventDefault();
    if (this.form.name !== null && this.idCategory !== null){
      this.category.update(this.form, this.idCategory)
          .then((res) => {
            console.log(res);
            this.reset();
            this.editable = false;
            this.getCategories();
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }
  
  del(event, id : Number) {
    event.preventDefault();
    this.category.destroy(id)
          .then((res) => {
            console.log(res);
            this.reset();
            this.editable = false;
            this.getCategories();
          })
          .catch((err) => {
            console.log(err);
          });
  }

  reset() {
    this.form.name = null;
    this.idCategory = null
  }

}