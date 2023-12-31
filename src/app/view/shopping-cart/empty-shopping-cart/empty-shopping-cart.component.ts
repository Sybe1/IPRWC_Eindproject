import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-empty-shopping-cart',
  templateUrl: './empty-shopping-cart.component.html',
  styleUrls: ['./empty-shopping-cart.component.scss']
})
export class EmptyShoppingCartComponent {
  @Input() public shoppingCartItems:  any[] = [];
}
