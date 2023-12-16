import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PopUpUpdateProductComponent} from "../pop-up-update-product/pop-up-update-product.component";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {LikedSuperComponent} from "../liked-super/liked-super.component";

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.scss']
})
export class LikedComponent extends LikedSuperComponent implements OnInit{
  likedItems: any[] = [];
  itemInformation: any[] = [];

  constructor(private productService: ProductService, public override route: ActivatedRoute) {
    super(route);
  }

  ngOnInit() {
    this.likedItems = this.getLikedItems();
    this.getInformationItems(this.likedItems);
  }


  public getInformationItems(items: any[]) {
    this.itemInformation = [];
    for (let i = 0; i < items.length; i++) {
      const itemId = items[i].id;
      this.productService.getProductsById(itemId).subscribe(
        (response: Product[]) => {
          this.itemInformation.push(response);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public getLikedItems(): any[] {
    const likedString = localStorage.getItem("liked");
    if (likedString) {
      return JSON.parse(likedString);
    } else {
      return [];
    }
  }

  toggleFavoriteLiked(productId: string | number | null) {
    const productIdString = productId ? productId.toString() : null;
    this.toggleFavorite(productIdString);
  }
}
