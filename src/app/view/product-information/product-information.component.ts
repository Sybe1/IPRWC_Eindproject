import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {MatDialog} from "@angular/material/dialog";
import {Product} from "../../models/product";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {ItemAddedToShoppingCartComponent} from "../item-added-to-shopping-cart/item-added-to-shopping-cart.component";
import {LikedSuperComponent} from "../liked-super/liked-super.component";

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.scss']
})
export class ProductInformationComponent extends LikedSuperComponent implements OnInit{
  products: any[] = [];
  image = 'assets/images/achtergrondBlauw.jpg';
  amountShoppingCartNow = 0;
  amountProduct:number = 0;
  shoppingCartItems: any[] = [];
  namePage: string = "Product";

  constructor(private productService: ProductService, public override route: ActivatedRoute, public dialog: MatDialog){
    super(route);
  }

  public ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.getProduct(productId);
    this.isFavorite = this.checkIfLiked(productId);
  }

  private checkIfLiked(productId: string | null): boolean {
    const likedItems = JSON.parse(localStorage.getItem("liked") ?? "[]");
    const existingProduct = likedItems.find((item: { id: string | null; }) => item.id === productId);
    return existingProduct ? true : false;
  }

  public getProduct(id:any): void{
    this.productService.getProductsById(id).subscribe((response: Product[]) => {
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

    if (this.amountProduct != 0) {
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
      const dialogRef = this.dialog.open(ItemAddedToShoppingCartComponent);
      this.amountProduct = 0;
    }
  }

  public toggleFavoriteProductInformation(): void{
    const productId = this.route.snapshot.paramMap.get('id');
    this.toggleFavorite(productId)
  }

}



