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
  public namePage: string = "Orders";
  public orders: any[] = [];
  protected readonly PopUpUpdateOrderComponent = PopUpUpdateOrderComponent;


  constructor(private orderService: OrderService, public openPopUpService: OpenPopUpService) {
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

  public deleteOrder(orderId: string): void{
    if(confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(orderId).subscribe(
        (resp) => {
          console.log(resp)
          this.getOrders();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
