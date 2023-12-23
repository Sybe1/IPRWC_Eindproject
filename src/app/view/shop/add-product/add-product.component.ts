import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PopUpUpdateProductComponent} from "../pop-up-update-product/pop-up-update-product.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  @Input() role: boolean | undefined ;


}
