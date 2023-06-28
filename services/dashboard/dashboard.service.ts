import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Expense } from 'src/app/models/expense.model';
import { Product } from 'src/app/models/product.model';
import { Revenue } from 'src/app/models/revenue.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  fetchStockProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.rooturl}/inventories/products`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar produtos em estoque:', error);
        throw error;
      })
    );
  }

  fetchRevenues(): Observable<Revenue[]> {
    return this.http.get<Revenue[]>(`${environment.rooturl}/finances/revenue`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar receitas:', error);
        throw error;
      })
    );
  }

  fetchExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${environment.rooturl}/finances/expenses`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar despesas:', error);
        throw error;
      })
    );
  }

}
