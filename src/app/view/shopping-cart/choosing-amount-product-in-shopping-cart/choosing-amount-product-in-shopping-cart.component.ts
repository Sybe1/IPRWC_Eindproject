import {Component, Input} from '@angular/core';
import {Product} from "../../../models/product";

@Component({
  selector: 'app-choosing-amoun-product-in-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './choosing-amount-product-in-shopping-cart.component.html',
  styleUrl: './choosing-amount-product-in-shopping-cart.component.scss'
})
export class ChoosingAmountProductInShoppingCartComponent {
  @Input() public amountProduct: number = 0;
  @Input() public product: Product = <Product>{};
  public minProduct(): void {
    if (this.amountProduct > 1){
      this.amountProduct -= 1;
    }
    this.addAmount();
  }

  public maxProduct(): void {
    if (this.product.stock != this.amountProduct){
      if (this.product.stock >= this.amountProduct + 1){
        this.amountProduct += 1;
      }
    }
    this.addAmount();
  }

  public addAmount(): void {
    if (this.amountProduct != 0) {
      this.pushProductInFullShoppingCart(this.product.id);
    }
  }

  public pushProductInFullShoppingCart(productId: string): void {
    const currentCartValue = JSON.parse(localStorage.getItem("shoppingCart") || '[]');
    const updatedCartValue = currentCartValue.filter((item: { id: string }) => item.id !== productId);

    const existingProduct = currentCartValue.find((item: { id: string }) => item.id === productId);

    if (existingProduct) {
      existingProduct.amount = this.amountProduct;
      updatedCartValue.push(existingProduct);
    }

    localStorage.setItem("shoppingCart", JSON.stringify(updatedCartValue));
  }


}
