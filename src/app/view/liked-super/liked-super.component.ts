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

  public addLiked(productId: string | null, storageKey: string): void {
    let currentLikedValue = JSON.parse(localStorage.getItem(storageKey) ?? '[]');

    if (!Array.isArray(currentLikedValue)) {
      currentLikedValue = [];
    }

    const existingProductIndex = currentLikedValue.findIndex((item: { id: string | null }) => item.id === productId);
    if (existingProductIndex !== -1) {
      currentLikedValue.splice(existingProductIndex, 1);
    } else {
      currentLikedValue.push({
        id: productId,
        isFavorite: true,
      });
    }
    localStorage.setItem(storageKey, JSON.stringify(currentLikedValue));
  }

  public toggleFavorite(productId: string | null): void {
    this.isFavorite = !this.isFavorite;
    this.addLiked(productId, 'liked');
  }
}
