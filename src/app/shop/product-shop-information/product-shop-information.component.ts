import {Component, Input} from '@angular/core';
import {Product} from "../../../models/product";

@Component({
  selector: 'app-product-shop-information',
  templateUrl: './product-shop-information.component.html',
  styleUrls: ['./product-shop-information.component.scss']
})
export class ProductShopInformationComponent {
  @Input() public product: Product | undefined;

}
