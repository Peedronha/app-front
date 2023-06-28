import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from 'src/app/services/translations/i18n.service';

import { Revenue } from './../../models/revenue.model';

@Component({
  selector: 'app-revenue-list',
  templateUrl: './revenue-list.component.html',
  styleUrls: ['./revenue-list.component.css']
})
export class RevenueListComponent implements OnInit {

  currentLanguage: string = 'pt'; // idioma padrão
  revenues: Revenue[] = [];
  messageSuccess: string = '';
  messageError: string = '';

  constructor(
    public i18nService: I18nService,
    private router: Router
  ) { }

  // INTERNACIONALIZACAO
  changeLanguage(language: string, event: Event): void {
    event.preventDefault();
    this.i18nService.setCurrentLanguage(language);
  }

  getTranslation(key: string): string {
    return this.i18nService.getTranslation(key);
  }

  ngOnInit(): void {

  }

  newRevenue() {
    this.router.navigate(['/revenues/form'])
  }

  deleteRevenue() {

  }



}
