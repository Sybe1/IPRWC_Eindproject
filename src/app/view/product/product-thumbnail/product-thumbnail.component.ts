import {Component, Input} from '@angular/core';
import {Product} from "../../../models/product";

@Component({
  selector: 'app-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
  styleUrls: ['./product-thumbnail.component.scss']
})
export class ProductThumbnailComponent {
  image:string = 'assets/images/achtergrondBlauw.jpg';
  @Input() public product: Product | undefined;
}
