import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Revenue } from 'src/app/models/revenue.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {

  constructor(private http: HttpClient) {}

  createRevenue(revenue: Revenue): Observable<Revenue> {
    return this.http.post<Revenue>(`${environment.rooturl}/finances/revenues`, revenue);
  }

  updateRevenue(revenue: Revenue): Observable<Revenue> {
    const url = `${environment.rooturl}/finances/revenues/${revenue.id}`;
    return this.http.put<Revenue>(url, revenue);
  }

  getRevenue(id: number): Observable<Revenue> {
    const url = `${environment.rooturl}/finances/revenues/${id}`;
    return this.http.get<Revenue>(url);
  }

  deleteRevenue(id: number): Observable<void> {
    const url = `${environment.rooturl}/finances/revenues/${id}`;
    return this.http.delete<void>(url);
  }

}
