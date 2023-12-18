import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../models/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiServerUrl}/order/all`);
  }

  public addOrders(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiServerUrl}/order/add`, order);
  }

  public updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiServerUrl}/order/update`, order);
  }

  public deleteOrder(orderId: number){
    return this.http.delete<void>(`${this.apiServerUrl}/order/delete/${orderId}`);
  }
}
