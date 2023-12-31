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
  public product: Product = <Product>{};
  public NAMEPAGE: string = "Product";
  public isUserLoggedIn: boolean = false;
  public isFavorite: boolean = true;
  public isProductOutOfStock: boolean = false;

  constructor(private productService: ProductService, public route: ActivatedRoute,
              public dialog: MatDialog, private isUserLoggedInService: IsUserLoggedInService){
  }

  public ngOnInit(): void {
    this.isUserLoggedInService.currentStatus.subscribe(message => this.isUserLoggedIn = !message)
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
        this.product = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      })
  }
}



