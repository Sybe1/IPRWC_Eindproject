import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from "../../../models/product";

@Component({
  selector: 'app-liked-items',
  templateUrl: './liked-items.component.html',
  styleUrls: ['./liked-items.component.scss']
})
export class LikedItemsComponent {
  @Input() public product: Product | undefined;
  @Input() public item: any[] | undefined;

}
