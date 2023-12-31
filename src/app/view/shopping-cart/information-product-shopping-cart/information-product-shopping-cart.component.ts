import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../models/product";
import {ShoppingCartItem} from "../../../models/shopping-cart-item";

@Component({
  selector: 'app-information-product-shopping-cart',
  templateUrl: './information-product-shopping-cart.component.html',
  styleUrls: ['./information-product-shopping-cart.component.scss']
})
export class InformationProductShoppingCartComponent{
  @Input() public item: ShoppingCartItem | undefined;
  @Input() public product:  Product | undefined;
  @Input() public shoppingCartItems:  any[] = [];

  public deleteProductFromShoppingCart(productId: string): void {
    const shoppingCartToString = localStorage.getItem('shoppingCart');
    if (shoppingCartToString) {
      this.shoppingCartItems = JSON.parse(shoppingCartToString);

      for (let i = 0; i < this.shoppingCartItems.length; i++) {
        if (this.shoppingCartItems[i].id == productId) {
          this.shoppingCartItems.splice(i, 1);
        }
      }
      localStorage.setItem("shoppingCart", JSON.stringify(this.shoppingCartItems));
      window.location.reload();
    }
  }
}
