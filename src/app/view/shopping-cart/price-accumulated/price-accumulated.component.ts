import {Component, Input} from '@angular/core';
import {BoughtItemsComponent} from "../bought-items/bought-items.component";
import {OrderService} from "../../../services/order.service";
import {MatDialog} from "@angular/material/dialog";
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product.service";
import {Order} from "../../../models/order";

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
}
