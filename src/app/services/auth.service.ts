import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { environment } from './../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
  
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
  
  setAccessToken () {
    let token = JSON.parse(localStorage.getItem('currentUser'));
    this.header = new HttpHeaders({'Authorization': 'Bearer ' + token.access_token, 'Accept': 'application/json'});
  }

  login(username: string, password: string) {
    let data = {
        grant_type: "password",
        client_id: environment.client_id,
        client_secret: environment.client_secret,
        username: username,
        password: password,
        scope: ""
    };

    console.log(data);
    
    let observable = this.http.post<any>(environment.server_url + '/oauth/token', data);
    return this.toPromise(observable).then((res) => {
        // Login bem sucedido se houver um token jwt na resposta
        if (res && res.access_token) {
            // armazene detalhes do usuário e jwt token no armazenamento local para manter o usuário logado entre as atualizações de página
            localStorage.setItem('currentUser', JSON.stringify(res));
            this.loggedIn.next(true);
        }
        return res;
    });
  }

  register(data: any) {
    let observable = this.http.post<any>(environment.server_url + '/api/v1/auth/register', data);
    return this.toPromise(observable);
  }

  logout() {
    // remova o usuário do armazenamento local para registrar o usuário
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
  }

  protected toPromise(request) {
    return request.toPromise()
        .then((res) => {
            return res || {}
        })
        .catch((err) => {
            //console.log(err.error.error);
            let message = 'Algo deu errado no servidor, informe o erro: ' + err.error.hint + ' ao administrador';
            if (err.status === 400) {
                message = 'Você não tem permissão para ver isso, informe um usuário e senha válidos.\n'+err.error.hint;
                this.router.navigate(['/login']);
            }
            if (err.status === 401) {
              message = 'Você não tem permissão para ver isso, informe um usuário e senha válidos';
              this.router.navigate(['/login']);
            }
            if (err.status === 422) {
                message = 'Falha de validação, verifique os campos';
            }
            if (err.status === 404 || err.status === 500) {
                message = 'Impossível se conectar ao servidor, verifique sua conexão ou tente novamente em alguns minutos';
            }
            this.notify.error(message, this.getConfig());
            return err;
        });
  }
}
