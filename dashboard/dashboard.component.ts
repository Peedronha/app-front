import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Expense } from '../models/expense.model';
import { Product } from '../models/product.model';
import { Revenue } from '../models/revenue.model';
import { CurrencyService } from '../services/dashboard/currency.service';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { DataService } from '../services/data/data.service';
import { ExpenseService } from '../services/finances/expense.service';
import { RevenueService } from '../services/finances/revenue.service';
import { ProductService } from '../services/inventories/product.service';
import { I18nService } from '../services/translations/i18n.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentLanguage: string = 'pt'; // idioma padrão
  listOfProducts: any[] = [];

  totalIncome: number = 0;
  totalBalance: number = 0;
  totalExpenses: number = 0;
  totalBalanceUSD: number = 0;

  stockProducts: Product[] = [];
  revenues: Revenue[] = [];
  expenses: Expense[] = [];

  totalBalanceFormatted: string = '';
  totalExpensesFormatted: string = '';

  searchQuery: string = '';
  searchOption: string = '';
  searchResults: any[] = [];

  locale: string = 'pt-BR';
  expense: Expense = new Expense();
  revenue: Revenue = new Revenue();

  constructor(
    public i18nService: I18nService,
    private dashboardService: DashboardService,
    private currencyPipe: CurrencyPipe,
    private currencyService: CurrencyService,
    private dataService: DataService,
    private productService: ProductService,
    private revenueService: RevenueService,
    private expenseService: ExpenseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchData();
    this.calculateTotalExpenses();
  }

  // INTERNACIONALIZACAO
  changeLanguage(language: string, event: Event): void {
    event.preventDefault();
    this.i18nService.setCurrentLanguage(language);
  }

  getTranslation(key: string): string {
    return this.i18nService.getTranslation(key);
  }

  // CALCULAR
  calculateTotalExpenses() {
    this.expenseService.getExpenses().subscribe(
      {
        next: expenses => {
          this.totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
        },
        error: error => {
          console.log('Erro ao buscar despesas: ', error);
        }
      }
    )
  }

  calculateTotalRevenues() {
    this.totalIncome = this.revenues.reduce((total, revenue) => total + revenue.amount, 0);
  }

  // verificar saldo
  checkBalance() {
    const balance = this.totalBalance - this.totalExpenses;
    console.log('Saldo total: ', balance);
  }

  // BUSCAR
  searchData() {
    // Lógica para buscar os dados com base nos critérios de pesquisa
    if (this.searchOption === 'product') {
      // buscar produtos
      this.searchResults = this.stockProducts.filter(
        product => product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else if (this.searchOption === 'revenue') {
      // Buscar receitas
      this.searchResults = this.revenues.filter(revenue =>
        revenue.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else if (this.searchOption === 'expense') {
      // Buscar despesas
      this.searchResults = this.expenses.filter(expense =>
        expense.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else if (this.searchOption === 'all') {
      // Buscar todos os dados
      this.searchResults = [...this.stockProducts, ...this.revenues, ...this.expenses].filter(item =>
        item.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      // Opção em branco ou inválida selecionada, limpar os resultados
      this.searchResults = [];
    }
  }

  private fetchData() {
    this.dashboardService.fetchStockProducts().subscribe(
      {
        next: (data: Product[]) => {
          this.stockProducts = data;
        },
        error: (error: any) => {
          console.error('Erro ao buscar produtos em estoque:', error);
        }
      }
    );
    this.dashboardService.fetchRevenues().subscribe(
      {
        next: (data: Revenue[]) => {
          this.revenues = data;
          this.calculateTotalRevenues();
          this.checkBalance();
        },
        error: (error: any) => {
          console.error('Erro ao buscar receitas:', error);
        }
      }
    );
    this.dashboardService.fetchExpenses().subscribe(
      {
        next: (data: Expense[]) => {
          this.expenses = data;
          this.calculateTotalExpenses();
          this.checkBalance();
        },
        error: (error: any) => {
          console.error('Erro ao buscar despesas:', error);
        }
      }
    );
  }

  // PRODUTO
  addProduct() {
    const newProduct = new Product();
    this.dataService.addProduct(newProduct).subscribe(
      {
        next: response => {
          this.stockProducts.push(response);
          this.router.navigate(['inventories/products', response.id]);
        },
        error: error => {
          console.error('Error adding product:', error);
        }
      }
    );
  }

  editProduct(productId: number): void {
    this.productService.getProduct(productId).subscribe(
      {
        next: (product: Product) => {

        },
        error: (error: any) => {
          console.error('Erro ao obter o produto:', error);
        }
      }
    );
  }

  deleteProduct(productId: number): void {
    if(confirm('Tem certeza que deseja excluir este produto?')) {
      this.productService.getProduct(productId).subscribe(
        {
          next: () => {
            this.stockProducts = this.stockProducts.filter(product => product.id !== productId);
          },
          error: (error: any) => {
            console.error('Erro ao excluir o produto:', error);
          }
        }
      );
    }
  }

  // RECEITAS
  addRevenue() {
    const newRevenue = new Revenue();
    this.dataService.addRevenue(newRevenue).subscribe(
      {
        next: response => {
          this.revenues.push(response);
          this.router.navigate(['/finances/revenue', response.id]);
        },
        error: error => {
          console.error('Error adding revenue:', error);
        }
      }
    );
  }

  editRevenue(revenueId: number): void {
    this.revenueService.getRevenue(revenueId).subscribe(
      {
        next: (revenue: Revenue) => {

        },
        error: (error: any) => {
          console.error('Erro ao obter o produto:', error);
        }
      }
    );
  }

  deleteRevenue(revenueId: number): void {

    if(confirm('Tem certeza que deseja excluir este produto?')) {
      this.revenueService.deleteRevenue(revenueId).subscribe(
        {
          next: () => {
            this.revenues = this.revenues.filter(revenue => revenue.id !== revenueId);
          },
          error: (error: any) => {
            console.error('Erro ao excluir valor:', error);
          }
        }
      );
    }
  }

  // DESPESAS
  addExpense() {
    const newExpense = new Expense();
    this.dataService.addExpense(newExpense).subscribe(
      {
        next: response => {
          this.expenses.push(response);
          this.calculateTotalExpenses();
          this.checkBalance();
        },
        error: error => {
          console.error('Error adding expense:', error);
        }
      }
    );
  }

  editExpense(expenseId: number): void {
    this.expenseService.getExpense(expenseId).subscribe(
      {
        next: (expense: Expense) => {

        },
        error: (error: any) => {
          console.error('Erro ao obter o produto:', error);
        }
      }
    );
  }


  deleteExpense(expenseId: number): void {

    if(confirm('Tem certeza que deseja excluir este produto?')) {
      this.expenseService.deleteExpense(expenseId).subscribe(
        {
          next: () => {
            this.expenses = this.expenses.filter(expense => expense.id !== expenseId);
          },
          error: (error: any) => {
            console.error('Erro ao excluir valor:', error);
          }
        }
      );
    }
  }
}
