import { Component } from '@angular/core';
import { Expense } from 'src/app/models/expense.model';
import { ExpenseService } from 'src/app/services/finances/expense.service';
import { LanguageService } from 'src/app/services/language.service';
import { I18nService } from 'src/app/services/translations/i18n.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent {

  currentLanguage: string = 'pt'; // idioma padrão
  expense: Expense = new Expense();

  availableLanguages = [
    { code: 'pt-BR', label: 'Português' },
    { code: 'en-US', label: 'English' }
  ];


  constructor(
    public i18nService: I18nService,
    private expenseService: ExpenseService,
    private languageService: LanguageService
  ) { }

  changeLanguage(locale: string) {
    this.languageService.locale = locale;
  }

  submitForm() {
    this.expenseService.createExpense(this.expense).subscribe(
      {
        next: (response: any) => {
          console.log('Despesa adicionada: ', response);
          this.expense = new Expense();
        },
        error: (error: any) => {
          console.error('Erro ao adicionar despesa: ', error);
        }
      }
    );
  }

  saveExpense() {
    const newExpense: Expense = new Expense();
    this.expenseService.addExpense(newExpense).subscribe(
      {
        next: (expense: any) => {
          console.log('Despesa cadastrada:', expense);
        },
        error: (error: any) => {
          console.error('Erro ao cadastrar despesa:', error);
        }
      }
    )
  }

}
