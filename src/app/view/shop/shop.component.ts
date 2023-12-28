import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../models/product';
import {MatDialog} from "@angular/material/dialog";
import {PopUpUpdateProductComponent} from "./pop-up-update-product/pop-up-update-product.component";
import {WhatIsRoleUserService} from "../../services/what-is-role-user.service";


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  products: any[] = [];
  namePage: string = "Shop";
  role: boolean = false;
  whatIsRoleUser: string = "";

  allClothingTypes: string[] = ["Hoodie", "Shirt", "Pants", "Underwear",
    "Socks", "Shoes", "Jacket", "Hat"];
  selectedClothingTypes: string[] = ["Hoodie", "Shirt", "Pants", "Underwear",
    "Socks", "Shoes", "Jacket", "Hat"];

  allTargetAudience: string[] = ["Men", "Women", "Unisex", "Children"];
  selectedTargetAudience: string[] = ["Men", "Women", "Unisex", "Children"];

  constructor(private productService: ProductService, private dialog: MatDialog, private whatIsRoleUserService: WhatIsRoleUserService){

  }

  public ngOnInit(): void{
    this.getProducts();
    if (localStorage.getItem('role') === 'ADMIN'){
      this.role = true;
    }
    this.whatIsRoleUserService.currentStatus.subscribe(message => this.whatIsRoleUser = message)
  }

  public onClothingTypeFilterChange(selectedClothingTypes: string[]): void {
    this.selectedClothingTypes = selectedClothingTypes;
    this.getProducts();
  }

  public onCheckboxChangeTargetAudience(selectedTargetAudience: string[]): void {
    this.selectedTargetAudience = selectedTargetAudience;
    this.getProducts();
  }

  public setToUpper(list: string[]): string[]{
    let newList: string[] = []
    for (let i = 0; i < list.length; i++) {
      newList[i] = list[i].toUpperCase();
    }
    return newList;
  }

  public getProducts(): void {
    let upperSelectedTargetAudience: string[] = this.setToUpper(this.selectedTargetAudience);
    let upperSelectedClothingTypes: string[] = this.setToUpper(this.selectedClothingTypes);
    this.productService.getProducts().subscribe((response: Product[]) => {
        this.products = response.filter(product =>
          upperSelectedClothingTypes.includes(product.clothingType) &&
          upperSelectedTargetAudience.includes(product.targetAudience)
        );
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteProduct(product: Product): void{
    if(confirm('Are you sure you want to delete this shop?'))
      this.productService.deleteProduct(product.id).subscribe(
        (resp) => {
          console.log(resp)
          this.getProducts();
        },
        (err) => {
          console.log(err);
        }
      );
  }
  public openPopup(code:any, title :any): void{
    const dialogRef = this.dialog.open(PopUpUpdateProductComponent,{
      width:'60%',
      data: {
        title: title,
        code: code
      }
    });
    dialogRef.componentInstance.onClose.subscribe(() => {
      this.getProducts();
    });
  }
}
