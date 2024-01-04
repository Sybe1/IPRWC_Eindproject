import {Component, Input, OnInit} from '@angular/core';
import {LoginToDoActionComponent} from "../login-to-do-action/login-to-do-action.component";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-choosing-amount-product',
  templateUrl: './choosing-amount-product.component.html',
  styleUrls: ['./choosing-amount-product.component.scss']
})
export class ChoosingAmountProductComponent{
  @Input() public isUserLoggedIn: boolean | undefined;
  @Input() public product: Product = <Product>{};
  @Input() public amountShoppingCart: number = 0;
  public amountProduct:number = 0
  constructor(public dialog: MatDialog, public route: ActivatedRoute) {
  }

  public minProduct(): void {
    if (this.amountProduct > 0){
      this.amountProduct -= 1;
    }
  }

  public maxProduct(): void {
     if (this.product.stock != this.amountProduct){
       if (this.product.stock >= this.amountProduct + this.amountShoppingCart + 1){
         this.amountProduct += 1;
       }
    }
    console.log(this.amountProduct)

  }

  public addAmount(): void {
    const productId:string = <string>this.route.snapshot.paramMap.get('id');
    if (this.amountProduct != 0 && this.isUserLoggedIn) {
      this.pushProductInEmptyShoppingCart(productId);
      this.pushProductInFullShoppingCart(productId)
      this.amountProduct = 0;
    }
    else if (!this.isUserLoggedIn){
      this.dialog.open(LoginToDoActionComponent);
    }
    window.location.reload();
  }

  public pushProductInEmptyShoppingCart(productId: string): void{
    if (localStorage.getItem("shoppingCart") == null) {
      const obj = [{
        id: productId,
        amount: this.amountProduct
      }];
      localStorage.setItem("shoppingCart", JSON.stringify(obj));
    }
  }

  public pushProductInFullShoppingCart(productId: string): void{
    if (localStorage.getItem("shoppingCart") != null) {
      const currentCartValue = JSON.parse(<string>localStorage.getItem("shoppingCart"));
      const existingProduct = currentCartValue.find((item: { id: string; }) => item.id === productId);
      if (existingProduct) {
        existingProduct.amount += this.amountProduct;
      }
      else {
        currentCartValue.push({
          id: productId,
          amount: this.amountProduct
        });
      }
      localStorage.setItem("shoppingCart", JSON.stringify(currentCartValue));
    }
  }
}
