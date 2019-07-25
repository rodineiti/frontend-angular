import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  protected header: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) { }

  setAccessToken () {
    let token = JSON.parse(localStorage.getItem('currentUser'));
    this.header = new HttpHeaders({'Authorization': 'Bearer ' + token.access_token, 'Accept': 'application/json'});
  }

  getStatementByPeriod(data: any) {
    this.setAccessToken();
    let observable = this.http.post<any>(environment.server_url + '/api/v1/statement', data, { headers: this.header });
    return this.toPromise(observable);
  }

  sumChartsByPeriod(data: any) {
    this.setAccessToken();
    let observable = this.http.post<any>(environment.server_url + '/api/v1/charts', data, { headers: this.header });
    return this.toPromise(observable);
  }

  protected toPromise(request) {
    return request.toPromise()
        .then((res) => {
            return res || {}
        })
        .catch((err) => {
            console.log(err);
            let message = 'Algo deu errado no servidor, informe o erro: ' + err.error.message + ' ao administrador';
            if (err.status === 400) {
                message = 'Você não tem permissão para ver isso, informe um usuário e senha válidos.\n'+err.error.message;
                this.router.navigate(['/login']);
            }
            if (err.status === 401) {
              message = 'Você não tem permissão para ver isso, informe um usuário e senha válidos';
              this.router.navigate(['/login']);
          }
            if (err.status === 422) {
                message = 'Falha de validação, verifique os campos';
            }
            if (err.status === 404) {
                message = 'Impossível se conectar ao servidor, verifique sua conexão ou tente novamente em alguns minutos';
            }
            if (err.non_field_errors) {
                message = 'Impossível fazer login com as credenciais fornecidas.';
            }
            alert(message);
            return err;
        });
  }
}
