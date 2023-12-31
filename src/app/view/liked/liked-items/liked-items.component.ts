import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from "../../../models/product";
import {ToggleFavoriteService} from "../../../services/toggle-favorite.service";
import {LikedItem} from "../../../models/liked-item";

@Component({
  selector: 'app-liked-items',
  templateUrl: './liked-items.component.html',
  styleUrls: ['./liked-items.component.scss']
})
export class LikedItemsComponent {
  @Input() public product: Product | undefined;
  @Input() public item: LikedItem | undefined;

  constructor(private toggleFavoriteService: ToggleFavoriteService) {
  }
  public toggleFavoriteLiked(productId: string): void {
    const productIdString:string = productId.toString();
    this.toggleFavoriteService.toggleFavorite(productIdString);
    window.location.reload();
  }
}
