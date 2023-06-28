import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from 'src/app/models/expense.model';
import { Product } from 'src/app/models/product.model';
import { Revenue } from 'src/app/models/revenue.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.rooturl}/invetories/products`, product);
  }

  addRevenue(revenue: Revenue): Observable<Revenue> {
    return this.http.post<Revenue>(`${environment.rooturl}/invetories/products`, revenue);
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${environment.rooturl}/invetories/products`, expense);
  }
}
