import {Component, Input} from '@angular/core';
import {PopUpUpdateOrderComponent} from "../pop-up-update-order/pop-up-update-order.component";
import {MatIconModule} from "@angular/material/icon";
import {OpenPopUpService} from "../../../services/open-pop-up.service";
import {OrderService} from "../../../services/order.service";
import {OrderComponent} from "../order.component";

@Component({
  selector: 'app-order-information',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './order-information.component.html',
  styleUrl: './order-information.component.scss'
})
export class OrderInformationComponent {
  @Input() public order: any;
  protected readonly PopUpUpdateOrderComponent = PopUpUpdateOrderComponent;

  constructor(public openPopUpService: OpenPopUpService, private orderService: OrderService,
              private orderComponent: OrderComponent) {
  }

  public deleteOrder(orderId: string): void{
    if(confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(orderId).subscribe(
        (resp) => {
          console.log(resp)
          this.orderComponent.getOrders();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
