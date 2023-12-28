import {Component, Input} from '@angular/core';
import {BoughtItemsComponent} from "../bought-items/bought-items.component";
import {OrderService} from "../../../services/order.service";
import {MatDialog} from "@angular/material/dialog";
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product.service";
import {Order} from "../../../models/order";
import {jwtDecode} from 'jwt-decode';
import {JwtPayload} from "../../../models/jwt-payload";

@Component({
  selector: 'app-price-accumulated',
  templateUrl: './price-accumulated.component.html',
  styleUrls: ['./price-accumulated.component.scss']
})
export class PriceAccumulatedComponent {
  @Input() public order: Order | undefined;
  @Input() public priceAccumulated: number | undefined;
  @Input() public shoppingCartItems: any[] = [];


  constructor(private orderService: OrderService, public dialog: MatDialog, private productService: ProductService) {
  }
  public boughtProducts(): void {
    const itemsShoppingCart = localStorage.getItem('shoppingCart');
    const loginToken = localStorage.getItem("loginToken")
    if (itemsShoppingCart != null && loginToken != null){
      const decodedJWT = jwtDecode(loginToken) as JwtPayload
      this.shoppingCartItems = JSON.parse(itemsShoppingCart);
      for (const item of this.shoppingCartItems) {
        this.order = {
          amount: item.amount,
          product: {
            id: item.id
          },
          user: {
            username: decodedJWT.sub
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
}
