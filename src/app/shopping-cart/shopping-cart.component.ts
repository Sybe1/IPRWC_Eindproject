import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  allTargetAudience: string[] = [ "MEN", "WOMEN", "UNISEX", "CHILDREN"];
  allClothingTypes: string[] = [ "HOODIE", "SHIRT", "PANTS", "UNDERWEAR",
    "SOCKS", "SHOES", "JACKET", "HAT"]

  onCheckboxChangeClothingType(product: string) {
    console.log("test")
  }

  onCheckboxChangeTargetAudience(product: string) {
    console.log("string")
  }
}
