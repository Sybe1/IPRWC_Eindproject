import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {Order} from "../../models/order";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{
  namePage: string = "Orders";
  orders: any[] = [];

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.getOrders()
  }

  public getOrders(): void{
    this.orderService.getOrders().subscribe((response: any[]) => {
      this.orders = response
      console.log(this.orders)
    })
  }
}
