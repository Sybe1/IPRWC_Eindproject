import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {MatDialog} from "@angular/material/dialog";
import {Product} from "../../models/product";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {ItemAddedToShoppingCartComponent} from "./item-added-to-shopping-cart/item-added-to-shopping-cart.component";
import {IsUserLoggedInService} from "../../services/is-user-logged-in.service";
import {LoginToDoActionComponent} from "./login-to-do-action/login-to-do-action.component";
import {ToggleFavoriteService} from "../../services/toggle-favorite.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  products: any[] = [];
  amountShoppingCartNow = 0;
  amountProduct:number = 0;
  shoppingCartItems: any[] = [];
  namePage: string = "Product";
  isLoginOrLogout: boolean = true;
  isFavorite: boolean = true;
  isProductOutOfStock: boolean = false;

  constructor(private productService: ProductService, public route: ActivatedRoute,
              public dialog: MatDialog, private isUserLoggedInService: IsUserLoggedInService,
              ){
  }

  public ngOnInit(): void {
    this.isUserLoggedInService.currentStatus.subscribe(message => this.isLoginOrLogout = message)
    const productId = this.route.snapshot.paramMap.get('id');
    this.getProduct(productId);
    this.isFavorite = this.checkIfLiked(productId);
  }

  private checkIfLiked(productId: string | null): boolean {
    const likedItems = JSON.parse(localStorage.getItem("liked") ?? "[]");
    const existingProduct = likedItems.find((item: { id: string | null; }) => item.id === productId);
    return !!existingProduct;
  }

  public getProduct(id:any): void{
    this.productService.getProductsById(id).subscribe((response: Product) => {
        if (Array.isArray(response)) {
          this.products = response;
        } else {
          this.products = [response];
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      })
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
    console.log(this.products[0])
    return this.products[0].stock == 0;
  }
}



