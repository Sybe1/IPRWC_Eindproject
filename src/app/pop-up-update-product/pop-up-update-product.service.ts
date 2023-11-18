import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import {Product} from "../product/product";

@Injectable({providedIn: 'root'})
export class PopUpUpdateProductService {
    // private apiServerUrl = environment.apiBaseUrl;
    //
    // constructor(private http: HttpClient) {}
    //
    // public updateProduct(product: Product): Observable<Product> {
    //     return this.http.put<Product>(`${this.apiServerUrl}/product/update`, product);
    // }


}
