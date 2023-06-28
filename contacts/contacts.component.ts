import { Component, OnInit } from '@angular/core';

import { I18nService } from '../services/translations/i18n.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  currentLanguage: string = 'pt'; // idioma padrão

  name: string = '';
  email: string = '';
  message: string = '';

  constructor(
    public i18nService: I18nService
  ) { }

  ngOnInit(): void { }

  // INTERNACIONALIZACAO
  changeLanguage(language: string, event: Event): void {
    event.preventDefault();
    this.i18nService.setCurrentLanguage(language);
  }

  getTranslation(key: string): string {
    return this.i18nService.getTranslation(key);
  }

}
