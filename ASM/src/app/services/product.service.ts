import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://127.0.0.1:8000/v1';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.url}/product`);
  }

  getProductDetail(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/product/${id}`);
  }

  getProductByQuery(params: any): Observable<Product[]> {
    const queries = [];
    if (params.category) {
      queries.push(`category=${params.category}`);
    }
    if (params.keyword) {
      queries.push(`keyword=${params.keyword}`);
    }
    const query = queries.join('&');
    return this.httpClient.get<Product[]>(`${this.url}/product?${query}`);
  }

  addProduct(body: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.url}/product`, body);
  }

  updateProduct(id: string, body: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.url}/product/${id}`, body);
  }

  deleteProduct(productId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/product/${productId}`);
  }
}
