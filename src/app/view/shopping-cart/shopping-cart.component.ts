import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {BoughtItemsComponent} from "./bought-items/bought-items.component";
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/order";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit{
  shoppingCartItems: any[] = [];
  itemInformation: any[] = [];
  order: Order | undefined;
  priceAccumalated: number = 0;
  namePage: string = "Shopping Cart";

  constructor(private productService: ProductService, public dialog: MatDialog, private orderService: OrderService) {
  }
  public ngOnInit(): void {
    this.shoppingCartItems = this.getShoppingCartItems();
    this.getInformationItems(this.shoppingCartItems);
  }

  public totalPrice(items: any[]): void{
    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < this.shoppingCartItems.length; j++) {
        if (items[i].id == this.shoppingCartItems[j].id) {
          this.priceAccumalated += this.shoppingCartItems[j].amount * items[i].price;
        }
      }
    }
  }

  public getInformationItems(items: any[]): void {
    this.itemInformation = [];
    for (let i = 0; i < items.length; i++) {
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
    const shoppingCartString = localStorage.getItem("shoppingCart");
    if (shoppingCartString) {
      return JSON.parse(shoppingCartString);
    } else {
      return [];
    }
  }

  public boughtProducts(): void {
    const itemsShoppingCart = localStorage.getItem('shoppingCart');
    if (itemsShoppingCart != null){
      this.shoppingCartItems = JSON.parse(itemsShoppingCart);
      for (const item of this.shoppingCartItems) {
        this.order = {
          id: 1,
          amount: item.amount,
          product: {
            id: item.id
          },
          user: {
            id: 1
          }
        };
        this.orderService.addOrders(this.order).subscribe();
        this.updateStockProduct(item.id, item.amount);
      }
    }
    this.dialog.open(BoughtItemsComponent);
    localStorage.removeItem('shoppingCart')
  }

  public updateStockProduct(code: number, amountOfBoughtProduct: number): void{
    this.productService.getProductsById(code).subscribe(item=>{
      const product: Product = {
        id: code,
        productName: item.productName,
        description: item.description,
        price: item.price,
        stock: item.stock - amountOfBoughtProduct,
        clothingType: item.clothingType,
        targetAudience: item.targetAudience,
        imageUrl: item.imageUrl
      };
      this.productService.updateProduct(product).subscribe(res => {
        console.log(res)
      });
    })
  }

  public deleteProductFromShoppingCart(productId: number): void {
    const shoppingCartToString = localStorage.getItem('shoppingCart');

    if (shoppingCartToString) {
      this.shoppingCartItems = JSON.parse(shoppingCartToString);

      for (let i = 0; i < this.shoppingCartItems.length; i++) {
        if (this.shoppingCartItems[i].id == productId) {
          this.shoppingCartItems.splice(i, 1);
        }
      }
      localStorage.setItem("shoppingCart", JSON.stringify(this.shoppingCartItems));

    }
  }

}
