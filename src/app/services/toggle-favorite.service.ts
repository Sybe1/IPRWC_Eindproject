import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleFavoriteService {
  private isFavorite: boolean = true;
  private likedItems: { id: string; isFavorite: boolean }[] = [];

  constructor() {
    this.loadLikedItems();
  }

  public toggleFavorite(productId: string): void {
    this.isFavorite = !this.isFavorite;
    const existingProductIndex = this.likedItems.findIndex((item) => item.id === productId);
    if (existingProductIndex !== -1) {
      this.likedItems.splice(existingProductIndex, 1);
    } else {
      this.likedItems.push({
        id: productId,
        isFavorite: true,
      });
    }
    this.saveLikedItems();
  }

  private loadLikedItems(): void {
    const likedItemsString: string = localStorage.getItem('liked') ?? '';
    this.likedItems = likedItemsString ? JSON.parse(likedItemsString) : [];
  }

  private saveLikedItems(): void {
    localStorage.setItem('liked', JSON.stringify(this.likedItems));
  }
}
