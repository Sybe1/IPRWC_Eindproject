import { Component } from '@angular/core';
import {PopUpUpdateProductService} from "./pop-up-update-product.service";
import {ProductComponent} from "../product/product.component";

@Component({
  selector: 'app-pop-up-update-product',
  templateUrl: './pop-up-update-product.component.html',
  styleUrls: ['./pop-up-update-product.component.scss']
})
export class PopUpUpdateProductComponent {

  // constructor(private popUpUpdateProductService: PopUpUpdateProductService, private productComponent: ProductComponent) {}
  // public updateProduct(){
  //   this.popUpUpdateProductService.updateProduct(this.productComponent.productToUpdate).subscribe(
  //       (resp) => {
  //         console.log(resp)
  //         this.productComponent.getProducts();
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //   );
  // }
  //
  // protected readonly ProductComponent = ProductComponent;
}
