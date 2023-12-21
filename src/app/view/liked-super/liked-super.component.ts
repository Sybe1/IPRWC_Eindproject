import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-liked-super',
  templateUrl: './liked-super.component.html',
  styleUrls: ['./liked-super.component.scss']
})
export class LikedSuperComponent {
  isFavorite: boolean = true;

  constructor(public route: ActivatedRoute) {}

  public toggleFavorite(productId: string): void {
    this.isFavorite = !this.isFavorite;

    const likedItemsString = localStorage.getItem('liked');
    const currentLikedValue = likedItemsString ? JSON.parse(likedItemsString) : [];

    const existingProductIndex = currentLikedValue.findIndex((item: { id: string}) => item.id === productId);

    if (existingProductIndex !== -1) {
      currentLikedValue.splice(existingProductIndex, 1);
    } else {
      currentLikedValue.push({
        id: productId,
        isFavorite: true,
      });
    }
    localStorage.setItem('liked', JSON.stringify(currentLikedValue));
  }
}
