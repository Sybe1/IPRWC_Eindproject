import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-latest-product',
  templateUrl: './latest-product.component.html',
  styleUrls: ['./latest-product.component.scss']
})
export class LatestProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private service: ProductService) {}

  public ngOnInit(): void {
    this.service.getLatestProduct().subscribe(
      (response: Product | Product[]) => {
        if (Array.isArray(response)) {
          this.products = response;
        } else {
          this.products = [response];
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}