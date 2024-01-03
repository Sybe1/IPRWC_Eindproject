import {Component, Input} from '@angular/core';
import {OpenPopUpService} from "../../../services/open-pop-up.service";
import {PopUpUpdateProductComponent} from "../pop-up-update-product/pop-up-update-product.component";


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  @Input() public whatIsRoleUser: string = 'CUSTOMER';

  constructor(public openPopUpService: OpenPopUpService){}

  protected readonly PopUpUpdateProductComponent = PopUpUpdateProductComponent;
}
