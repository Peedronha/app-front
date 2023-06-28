import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from 'src/app/services/translations/i18n.service';

import { Revenue } from './../../models/revenue.model';

@Component({
  selector: 'app-revenue-form',
  templateUrl: './revenue-form.component.html',
  styleUrls: ['./revenue-form.component.css']
})
export class RevenueFormComponent implements OnInit {

  currentLanguage: string = 'pt'; // idioma padrão
  revenue = new Revenue();
  successMessage: string = '';

  constructor(
    public i18nService: I18nService,
    private router: Router) { }

  ngOnInit(): void { }

  // INTERNACIONALIZACAO
  changeLanguage(language: string, event: Event): void {
    event.preventDefault();
    this.i18nService.setCurrentLanguage(language);
  }

  getTranslation(key: string): string {
    return this.i18nService.getTranslation(key);
  }


  /*
  registerRevenue(): void {
    this.revenueService.registerRevenue(this.revenue).subscribe(
      {
        next: (revenue: Revenue) => {
          console.log('Receita cadastrada com sucesso:', revenue);
          this.successMessage = 'Receita cadastrada com sucesso!';
          this.clearForm();
        },
        error: (error: any) => {
          console.error('Erro ao cadastrar receita:', error);
          // Lógica de tratamento de erro, se necessário
        }
      }
    );
  }*/

  clearForm(): void {
    this.revenue.description = '';
    this.revenue.amount = 0;
  }

  backToDashboard() {
    this.router.navigate(['/dashboard']);
  }

}
