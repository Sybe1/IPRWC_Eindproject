import {Component, Input, OnInit} from '@angular/core';
import {ItemAddedToShoppingCartComponent} from "../item-added-to-shopping-cart/item-added-to-shopping-cart.component";
import {LoginToDoActionComponent} from "../login-to-do-action/login-to-do-action.component";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-choosing-amount-product',
  templateUrl: './choosing-amount-product.component.html',
  styleUrls: ['./choosing-amount-product.component.scss']
})
export class ChoosingAmountProductComponent implements OnInit{
  public shoppingCartItems: any[] = [];
  public amountProduct:number = 0;
  @Input() public isUserLoggedIn: boolean | undefined;
  @Input() public product: Product = <Product>{};
  constructor(public dialog: MatDialog, public route: ActivatedRoute) {
  }

  ngOnInit() {
    const shoppingCartString = localStorage.getItem("shoppingCart") ?? '';
    this.shoppingCartItems = JSON.parse(shoppingCartString);
    for (let i = 0; i < this.shoppingCartItems.length; i++){
      if (this.shoppingCartItems[i].id == this.product.id){
        this.amountProduct = this.shoppingCartItems[i].amount;
      }
    }
  }

  public minProduct(): void {
    if (this.amountProduct > 0){
      this.amountProduct -= 1;
    }
  }

  public maxProduct(): void {
     if (this.product.stock != this.amountProduct){
       if (this.product.stock >= this.amountProduct + 1){
         this.amountProduct += 1;
       }
    }
  }

  public addAmount(): void {
    const productId = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.amountProduct != 0 && this.isUserLoggedIn) {
      this.pushProductInEmptyShoppingCart(productId);
      this.pushProductInFullShoppingCart(productId)
      this.dialog.open(ItemAddedToShoppingCartComponent);
      this.amountProduct = 0;
    }
    else if (!this.isUserLoggedIn){
      this.dialog.open(LoginToDoActionComponent);
    }
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
      const currentCartValue = JSON.parse(localStorage.getItem("shoppingCart") ?? "[]");
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
