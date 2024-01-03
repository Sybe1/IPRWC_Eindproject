import {Component, Input} from '@angular/core';
import {PopUpUpdateProductComponent} from "../pop-up-update-product/pop-up-update-product.component";
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product.service";
import {OpenPopUpService} from "../../../services/open-pop-up.service";
import {ShopComponent} from "../shop.component";

@Component({
  selector: 'app-edit-delete-product',
  templateUrl: './edit-delete-product.component.html',
  styleUrls: ['./edit-delete-product.component.scss']
})
export class EditDeleteProductComponent {
  @Input() public whatIsRoleUser: string = 'CUSTOMER';
  @Input() public product: any;
  protected readonly PopUpUpdateProductComponent = PopUpUpdateProductComponent;

  constructor(private productService: ProductService, public openPopUpService: OpenPopUpService,
              private shopComponent: ShopComponent) {
  }

  public deleteProduct(product: Product): void{
    if(confirm('Are you sure you want to delete this shop?')) {
      this.productService.deleteProduct(product.id).subscribe(
        (resp) => {
          console.log(resp)
          this.shopComponent.getProducts();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
