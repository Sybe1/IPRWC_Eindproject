import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {Order} from "../../models/order";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit{
  public shoppingCartItems: any[] = [];
  public itemInformation: any[] = [];
  public order: Order | undefined;
  public priceAccumulated: number = 0;
  public TITLE_OF_PAGE: string = "Shopping Cart";

  constructor(private productService: ProductService, public dialog: MatDialog) {
  }
  public ngOnInit(): void {
    this.shoppingCartItems = this.getShoppingCartItems()
    if (this.shoppingCartItems) {
      this.getInformationItems(this.shoppingCartItems);
    }
  }

  public totalPrice(items: any[]): void{
    for (let i:number = 0; i < items.length; i++) {
      for (let j:number = 0; j < this.shoppingCartItems.length; j++) {
        if (items[i].id == this.shoppingCartItems[j].id) {
          this.priceAccumulated += this.shoppingCartItems[j].amount * items[i].price;
        }
      }
    }
  }

  public getInformationItems(items: any[]): void {
    this.itemInformation = [];
    for (let i:number = 0; i < items.length; i++) {
      const itemId = items[i].id;
      this.productService.getProductsById(itemId).subscribe(
        (response: Product) => {
          this.itemInformation.push(response);
          if (i === items.length - 1) {
            this.totalPrice(this.itemInformation);
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public getShoppingCartItems(): any[] {
    const shoppingCartString:string = <string>localStorage.getItem("shoppingCart");
    return JSON.parse(shoppingCartString);
  }
}
