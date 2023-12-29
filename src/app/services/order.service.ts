import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../models/order";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiServerUrl}/order/all`);
  }

  public getOrdersById(code: any): Observable<Order> {
    return this.http.get<Order>(`${this.apiServerUrl}/order/find/` + code);
  }


  public addOrders(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiServerUrl}/order/add`, order);
  }

  public updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiServerUrl}/order/update`, order);
  }

  public deleteOrder(orderId: string){
    return this.http.delete<void>(`${this.apiServerUrl}/order/delete/${orderId}`);
  }
}
