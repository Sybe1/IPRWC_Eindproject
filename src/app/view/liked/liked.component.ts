import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.scss']
})
export class LikedComponent implements OnInit{
  public likedItems: any[] = [];
  public itemInformation: any[] = [];
  public NAMEPAGE: string = "Liked";

  constructor(private productService: ProductService) {
  }

  public ngOnInit(): void {
    this.likedItems = this.getLikedItems();
    this.getInformationItems(this.likedItems);
  }


  public getInformationItems(items: any[]): void {
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
    const likedString: string = localStorage.getItem("liked") ?? '';
    return JSON.parse(likedString);
  }
}
