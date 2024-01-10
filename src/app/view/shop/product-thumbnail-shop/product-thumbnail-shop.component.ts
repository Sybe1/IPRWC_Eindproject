import {Component, Input} from '@angular/core';
import {Product} from "../../../models/product";

@Component({
  selector: 'app-product-thumbnail-shop',
  templateUrl: './product-thumbnail-shop.component.html',
  styleUrls: ['./product-thumbnail-shop.component.scss']
})
export class ProductThumbnailShopComponent {
  @Input() public product: Product | undefined;
  public BACKGROUND_IMAGE:string = 'assets/images/achtergrondBlauw.jpg';
}
