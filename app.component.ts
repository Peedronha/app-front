import { Component, OnInit } from '@angular/core';

import { I18nService } from './services/translations/i18n.service';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'FinStock';

  currentLanguage: string = 'pt'; // idioma padrão

  constructor(
    private i18nService: I18nService,
    private languageService: LanguageService
  ) {
    this.languageService.locale = 'pt-BR';
  }

  ngOnInit(): void {
    document.addEventListener('languageChange', () => {
      this.updateLanguage();
    });
  }

  private updateLanguage(): void {
    const currentLanguage = this.i18nService.getCurrentLanguage();
  }

  // INTERNACIONALIZACAO
  changeLanguage(language: string, event: Event): void {
    event.preventDefault();
    this.i18nService.setCurrentLanguage(language);
  }

  getTranslation(key: string): string {
    return this.i18nService.getTranslation(key);
  }


}
