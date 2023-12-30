import {Component, Input} from '@angular/core';
import {Product} from "../../../models/product";
import {LoginToDoActionComponent} from "../login-to-do-action/login-to-do-action.component";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ToggleFavoriteService} from "../../../services/toggle-favorite.service";

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.scss']
})
export class ProductInformationComponent {
  @Input() public product: Product | undefined;
  @Input() public isFavorite: boolean | undefined;
  @Input() public isUserLoggedIn: boolean | undefined;

  constructor(public route: ActivatedRoute, public dialog: MatDialog, private toggleFavoriteService: ToggleFavoriteService) {
  }
  public toggleFavoriteProductInformation(): void{
    if (this.isUserLoggedIn) {
      const productId = <string>this.route.snapshot.paramMap.get('id');
      this.toggleFavorite(productId)
      this.isFavorite = !this.isFavorite;
    }
    else{
      this.dialog.open(LoginToDoActionComponent);
    }
  }

  public toggleFavorite(productId: string): void {
    this.toggleFavoriteService.toggleFavorite(productId);
  }
}
