import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from 'src/app/models/expense.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) {}

  createExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${environment.rooturl}/finances/expenses`, expense);
  }

  updateExpense(expense: Expense): Observable<Expense> {
    const url = `${environment.rooturl}/finances/expenses/${expense.id}`;
    return this.http.put<Expense>(url, expense);
  }

  getExpense(id: number): Observable<Expense> {
    const url = `${environment.rooturl}/finances/expenses//${id}`;
    return this.http.get<Expense>(url);
  }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${environment.rooturl}/finances/expenses`);
  }

  deleteExpense(id: number): Observable<void> {
    const url = `${environment.rooturl}/finances/expenses/${id}`;
    return this.http.delete<void>(url);
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${environment.rooturl}/finances/expenses`, expense);
  }

}
