import { Injectable } from '@angular/core';

import { Product } from '../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.rooturl}/inventories/products`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${environment.rooturl}/inventories/products/${product.id}`;
    return this.http.put<Product>(url, product);
  }

  getProduct(id: number): Observable<Product> {
    const url = `${environment.rooturl}/inventories/products/${id}`;
    return this.http.get<Product>(url);
  }

  deleteProduct(id: number): Observable<void> {
    const url = `${environment.rooturl}/inventories/products/${id}`;
    return this.http.delete<void>(url);
  }

}
