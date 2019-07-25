import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {
    username: null,
    password: null,
  };

  form: any = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
  };

  loginError: boolean = false;

  constructor(
    private auth: AuthService, 
    private router: Router, private notify: SnotifyService) { }

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

  ngOnInit() {
    this.auth.logout();
  }

  login(event){
    event.preventDefault();
    if (this.validateLogin()) {
      this.auth.login(this.user.username, this.user.password)
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch((err) => {
          console.log(err);
          this.loginError = true;
        });  
    }
  }

  validateLogin() {
    if (this.user.username == '' || this.user.username == null){
      this.notify.error('Informa seu e-mail de acesso', this.getConfig());
      return false;
    }

    if (this.user.password == '' || this.user.password == null){
      this.notify.error('Informa sua senha de acesso', this.getConfig());
      return false;
    }

    return true;
  }

  register(event){
    event.preventDefault();
    if (this.validateRegister()) {
      this.auth.register(this.form)
        .then((res) => {
          alert(res.message);
          this.form.name = null;
          this.form.email = null;
          this.form.password = null;
          this.form.password_confirmation = null;
          this.router.navigate(['/login']);
        })
        .catch((err) => {
          console.log(err);
          this.loginError = true;
        }); 
    }
  }

  validateRegister() {
    if (this.form.name == '' || this.form.name == null){
      this.notify.error('Informa seu nome', this.getConfig());
      return false;
    }

    if (this.form.email == '' || this.form.email == null){
      this.notify.error('Informa seu e-mail', this.getConfig());
      return false;
    }

    if (this.form.password == '' || this.form.password == null){
      this.notify.error('Informa sua senha', this.getConfig());
      return false;
    }

    if (this.form.password_confirmation == '' || this.form.password_confirmation == null){
      this.notify.error('Confirme sua senha', this.getConfig());
      return false;
    }

    if (this.form.password != this.form.password_confirmation){
      this.notify.error('Senha de confirmação não confere, favor verificar', this.getConfig());
      return false;
    }

    return true;
  }

}
