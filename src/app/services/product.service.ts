import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/app/environment/environment';

@Injectable({providedIn: 'root'})
export class ProductService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServerUrl}/product/all`);
  }

  public getProductsById(code: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServerUrl}/product/find/` + code);
  }

  public getLatestProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServerUrl}/product/findHighestId`);
  }

  public addProducts(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiServerUrl}/product/add`, product);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiServerUrl}/product/update`, product);
  }

  public deleteProduct(productId: number){
    return this.http.delete<void>(`${this.apiServerUrl}/product/delete/${productId}`);
  }
}
