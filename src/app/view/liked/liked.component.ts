import {Component, OnInit} from '@angular/core';
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
  namePage: string = "Liked";

  constructor(private productService: ProductService, public override route: ActivatedRoute) {
    super(route);
  }

  public ngOnInit(): void {
    this.likedItems = this.getLikedItems();
    this.getInformationItems(this.likedItems);
  }


  public getInformationItems(items: any[]): void {
    this.itemInformation = [];
    for (let i = 0; i < items.length; i++) {
      const itemId = items[i].id;
      this.productService.getProductsById(itemId).subscribe(
        (response: Product) => {
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

  public toggleFavoriteLiked(productId: string | number | null): void {
    const productIdString = productId ? productId.toString() : null;
    this.toggleFavorite(productIdString);
    window.location.reload();
  }
}
