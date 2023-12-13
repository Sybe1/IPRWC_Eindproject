import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product/product.service";
import {MatDialog} from "@angular/material/dialog";
import {Product} from "../product/product";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {ItemAddedToShoppingCartComponent} from "../item-added-to-shopping-cart/item-added-to-shopping-cart.component";

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.scss']
})
export class ProductInformationComponent implements OnInit{
  products: any[] = [];
  image = 'assets/images/achtergrondBlauw.jpg';
  hoeveelheidProduct:number = 0;

  constructor(private productService: ProductService, private route: ActivatedRoute, public dialog: MatDialog){
  }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.getProduct(productId);
  }

  public getProduct(id:any){
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

  minProduct() {
    if (this.hoeveelheidProduct > 0){
      this.hoeveelheidProduct -= 1;
    }
  }

  maxProduct() {
    this.hoeveelheidProduct += 1;
  }

  aantalToevoegen() {
    const productId = this.route.snapshot.paramMap.get('id');

    if (this.hoeveelheidProduct != 0) {
      if (localStorage.getItem("shoppingCart") == null) {
        const obj = [{
          id: productId,
          amount: this.hoeveelheidProduct
        }];

        localStorage.setItem("shoppingCart", JSON.stringify(obj));
      } else if (localStorage.getItem("shoppingCart") != null) {

        const currentCartValue = JSON.parse(localStorage.getItem("shoppingCart") ?? "[]");

        const existingProduct = currentCartValue.find((item: { id: string | null; }) => item.id === productId);

        if (existingProduct) {
          existingProduct.amount += this.hoeveelheidProduct;
        } else {
          currentCartValue.push({
            id: productId,
            amount: this.hoeveelheidProduct
          });
        }

        localStorage.setItem("shoppingCart", JSON.stringify(currentCartValue));
      }
      const dialogRef = this.dialog.open(ItemAddedToShoppingCartComponent);
    }
  }


}



