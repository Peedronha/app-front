import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getCookie } from 'typescript-cookie';

import { User } from '../models/user.model';
import { LoginService } from '../services/login/login.service';
import { I18nService } from '../services/translations/i18n.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentLanguage: string = 'pt'; // idioma padrão
  email: string = '';
  password: string  = '';
  errorMessage: string = '';
  authStatus: string = "";
  model = new User();

  constructor(
    public i18nService: I18nService,
    private loginService: LoginService,
    private router: Router
  ) {

  }

  ngOnInit( ): void { }

  // INTERNACIONALIZACAO
  changeLanguage(language: string, event: Event): void {
    event.preventDefault();
    this.i18nService.setCurrentLanguage(language);
  }

  getTranslation(key: string): string {
    return this.i18nService.getTranslation(key);
  }

  validateUser(loginForm: NgForm) {
    console.log("validate user");
    this.loginService.validateLoginDetails(this.model).subscribe(
      responseData => {
        window.sessionStorage.setItem("Authorization",responseData.headers.get('Authorization')!);
        this.model = <any> responseData.body;
        this.model.authStatus = 'AUTH';
        window.sessionStorage.setItem("userdetails",JSON.stringify(this.model));
        let xsrf = getCookie('XSRF-TOKEN')!;
        window.sessionStorage.setItem("XSRF-TOKEN",xsrf);
        this.router.navigate(['/dashboard']);
      });

  }

}
