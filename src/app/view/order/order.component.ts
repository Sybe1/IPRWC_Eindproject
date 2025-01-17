import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {PopUpUpdateOrderComponent} from "./pop-up-update-order/pop-up-update-order.component";
import {MatDialog} from "@angular/material/dialog";
import {OpenPopUpService} from "../../services/open-pop-up.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{
  public TITLE_OF_PAGE: string = "Orders";
  public orders: any[] = [];
  constructor(private orderService: OrderService) {
  }

  public ngOnInit(): void {
    this.getOrders()
  }

  public getOrders(): void{
    this.orderService.getOrders().subscribe((response: any[]) => {
      this.orders = response
      console.log(this.orders)
    })
  }
}
