import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product/product.service";
import {MatDialog} from "@angular/material/dialog";
import {Product} from "../product/product";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.scss']
})
export class ProductInformationComponent implements OnInit{
  products: any[] = [];

  constructor(private productService: ProductService, private route: ActivatedRoute){
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
}



