import {Component, Input} from '@angular/core';
import {ItemAddedToShoppingCartComponent} from "../item-added-to-shopping-cart/item-added-to-shopping-cart.component";
import {LoginToDoActionComponent} from "../login-to-do-action/login-to-do-action.component";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-choosing-amount-product',
  templateUrl: './choosing-amount-product.component.html',
  styleUrls: ['./choosing-amount-product.component.scss']
})
export class ChoosingAmountProductComponent {
  isProductOutOfStock: boolean = false;
  shoppingCartItems: any[] = [];
  amountShoppingCartNow = 0;
  amountProduct:number = 0;
  @Input() public isLoginOrLogout: boolean | undefined;
  @Input() public products: any[] = [];


  constructor(public dialog: MatDialog, public route: ActivatedRoute) {
  }
  public minProduct(): void {
    if (this.amountProduct > 0){
      this.amountProduct -= 1;
    }
  }

  public maxProduct(): void {
    this.isProductOutOfStock = this.outOfStock();
    const shoppingCartString = localStorage.getItem("shoppingCart");
    if (shoppingCartString){
      this.shoppingCartItems = JSON.parse(shoppingCartString);
    }
    for (let i = 0; i < this.shoppingCartItems.length; i++){
      if (this.shoppingCartItems[i].id == this.products[0].id){
        this.amountShoppingCartNow = this.shoppingCartItems[i].amount;
      }
    }

    if (this.products[0].stock != this.amountProduct){
      if (this.amountProduct + this.amountShoppingCartNow + 1 <= this.products[0].stock)
        this.amountProduct += 1;
    }
  }

  public addAmount(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (this.amountProduct != 0 && !this.isLoginOrLogout) {
      if (localStorage.getItem("shoppingCart") == null) {
        const obj = [{
          id: productId,
          amount: this.amountProduct
        }];

        localStorage.setItem("shoppingCart", JSON.stringify(obj));
      } else if (localStorage.getItem("shoppingCart") != null) {

        const currentCartValue = JSON.parse(localStorage.getItem("shoppingCart") ?? "[]");

        const existingProduct = currentCartValue.find((item: { id: string | null; }) => item.id === productId);

        if (existingProduct) {
          existingProduct.amount += this.amountProduct;
        } else {
          currentCartValue.push({
            id: productId,
            amount: this.amountProduct
          });
        }
        localStorage.setItem("shoppingCart", JSON.stringify(currentCartValue));
      }
      this.dialog.open(ItemAddedToShoppingCartComponent);
      this.amountProduct = 0;
    }
    else if (this.amountProduct != 0 && this.isLoginOrLogout){
      this.dialog.open(LoginToDoActionComponent);
    }
  }

  public outOfStock():boolean{
    return this.products[0].stock == 0;
  }
}
