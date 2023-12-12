import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product/product.service";
import {Product} from "../product/product";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit{
  shoppingCartItems: any[] = [];
  itemInformation: any[] = [];
  priceAccumalated: number = 0;

  constructor(private productService: ProductService) {
  }
  ngOnInit() {
    this.shoppingCartItems = this.getShoppingCartItems();
    this.getInformationItems(this.shoppingCartItems);
  }

  public totalPrice(items: any[]){
    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < this.shoppingCartItems.length; j++) {
        if (items[i].id == this.shoppingCartItems[j].id) {
          this.priceAccumalated += this.shoppingCartItems[j].amount * items[i].price;
        }
      }
    }
  }

  getInformationItems(items: any[]) {
    this.itemInformation = [];
    for (let i = 0; i < items.length; i++) {
      const itemId = items[i].id;
      this.productService.getProductsById(itemId).subscribe(
        (response: Product[]) => {
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

  getShoppingCartItems(): any[] {
    const shoppingCartString = localStorage.getItem("shoppingCart");
    if (shoppingCartString) {
      return JSON.parse(shoppingCartString);
    } else {
      return [];
    }
  }
}
