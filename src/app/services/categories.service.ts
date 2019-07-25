import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { environment } from './../../environments/environment';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  protected header: HttpHeaders;

  constructor(private http: HttpClient, private router: Router, private notify: SnotifyService) { }

  getConfig(): SnotifyToastConfig {
    this.notify.setDefaults({
      global: {
        newOnTop: true
      }
    });
    return {
      position: SnotifyPosition.rightTop
    };
  }

  setAccessToken () {
    let token = JSON.parse(localStorage.getItem('currentUser'));
    this.header = new HttpHeaders({'Authorization': 'Bearer ' + token.access_token, 'Accept': 'application/json'});
  }

  index() {
    this.setAccessToken();
    let observable = this.http.get<any>(environment.server_url + '/api/v1/categories', { headers: this.header })
    return this.toPromise(observable);
  }

  store(data: any) {
    this.setAccessToken();
    let observable = this.http.post<any>(environment.server_url + '/api/v1/categories/store', data, { headers: this.header });
    return this.toPromise(observable);
  }

  show(id: Number) {
    this.setAccessToken();
    let observable = this.http.get<any>(environment.server_url + `/api/v1/categories/show/${id}`, { headers: this.header });
    return this.toPromise(observable);
  }

  update(data: any, id: Number) {
    this.setAccessToken();
    let observable = this.http.put<any>(environment.server_url + `/api/v1/categories/update/${id}`, data, { headers: this.header });
    return this.toPromise(observable);
  }

  destroy(id: Number) {
    this.setAccessToken();
    let observable = this.http.delete<any>(environment.server_url + `/api/v1/categories/destroy/${id}`, { headers: this.header });
    return this.toPromise(observable);
  }

  protected toPromise(request) {
    return request.toPromise()
        .then((res) => {
            return res || {}
        })
        .catch((err) => {
            //console.log(err);
            let message = 'Algo deu errado no servidor, contacte ao administrador';
            if (err.status === 400) {
                message = 'Você não tem permissão para ver isso, informe um usuário e senha válidos';
                this.router.navigate(['/login']);
            }
            if (err.status === 401) {
              message = 'Você não tem permissão para ver isso, informe um usuário e senha válidos';
              this.router.navigate(['/login']);
            }
            if (err.status === 422) {
              for (var key in err.error.errors) {
                for (var index = 0; index < err.error.errors[key].length; index++) {
                  this.notify.error(err.error.errors[key][index], this.getConfig())
                }
              }
              return err.error;
            }
            if (err.status === 404) {
                message = 'Impossível se conectar ao servidor, verifique sua conexão ou tente novamente em alguns minutos';
            }
            if (err.non_field_errors) {
                message = 'Impossível fazer login com as credenciais fornecidas.';
            }
            this.notify.error(message, this.getConfig());
            return err;
        });
  }
}
