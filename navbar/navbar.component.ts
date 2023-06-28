import { Component, OnInit, Renderer2 } from '@angular/core';

import { I18nService } from './../services/translations/i18n.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';
import { UserService } from '../services/users/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  iconClass: string; // tema padrão
  currentLanguage: string; // idioma padrão

  isDarkTheme: boolean = false;
  isNavbarCollapsed: boolean = true;
  loggedInUser: string = '';
  user = new User();

  constructor(
    private renderer: Renderer2,
    public i18nService: I18nService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService) {
      this.currentLanguage = 'pt';
      this.iconClass = 'fa fa-sun';
    }

  ngOnInit(): void {

    this.checkTheme();

    if(sessionStorage.getItem('userdetails')) {
      this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
    }

    this.userService.getUser().then(userName => {
      this.setLoggedInUser(userName);
    });

  }

  // BOTAO TOGGLE
  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  // TEMA
  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.saveThemePreference();
    this.applyTheme();
  }

  checkTheme(): void {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      this.isDarkTheme = storedTheme === 'dark';
    } else {
      this.isDarkTheme = false;
      this.saveThemePreference();
    }
    this.applyTheme();
  }

  saveThemePreference(): void {
    const theme = this.isDarkTheme ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  }

  applyTheme(): void {
    if (this.isDarkTheme) {
      this.renderer.addClass(document.body, 'theme-dark');
      this.renderer.removeClass(document.body, 'theme-light');
      this.iconClass = 'fa fa-moon';
    } else {
      this.renderer.removeClass(document.body, 'theme-dark');
      this.renderer.addClass(document.body, 'theme-light');
      this.iconClass = 'fa fa-sun';
    }
  }

  // INTERNACIONALIZACAO
  changeLanguage(language: string, event: Event): void {
    event.preventDefault();
    this.i18nService.setCurrentLanguage(language);
  }

  getTranslation(key: string): string {
    return this.i18nService.getTranslation(key);
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  setLoggedInUser(userName  : string): void {
    this.loggedInUser = userName ;
  }

}
