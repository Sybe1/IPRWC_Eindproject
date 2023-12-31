import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {PopUpUpdateOrderComponent} from "./pop-up-update-order/pop-up-update-order.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{
  public namePage: string = "Orders";
  public orders: any[] = [];

  constructor(private orderService: OrderService, private dialog: MatDialog) {
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

  public openPopup(code:any, title :any): void{
    const dialogRef = this.dialog.open(PopUpUpdateOrderComponent,{
      width:'18%',
      data: {
        title: title,
        code: code
      }
    });
    dialogRef.componentInstance.onClose.subscribe(() => {
      this.getOrders();
    });
  }
}
