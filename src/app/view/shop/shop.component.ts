import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../models/product';
import {MatDialog} from "@angular/material/dialog";
import {PopUpUpdateProductComponent} from "./pop-up-update-product/pop-up-update-product.component";
import {WhatIsRoleUserService} from "../../services/what-is-role-user.service";
import {ClothingTypeService} from "../../services/clothing-type.service";
import {ClothingType} from "../../models/clothing-type";
import {TargetAudience} from "../../models/target-audience";
import {TargetAudienceService} from "../../services/target-audience.service";


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

  allClothingTypes: string[] = [];
  selectedClothingTypes: string[] = [];

  allTargetAudience: string[] = [];
  selectedTargetAudience: string[] = [];

  constructor(private productService: ProductService, private dialog: MatDialog, private whatIsRoleUserService: WhatIsRoleUserService,
              private clothingTypeService: ClothingTypeService, private targetAudienceService: TargetAudienceService){

  }

  public ngOnInit(): void{
    this.getClothingTypes();
    this.getTargetAudiences();
    this.getProducts();
    if (localStorage.getItem('role') === 'ADMIN'){
      this.role = true;
    }
    this.whatIsRoleUserService.currentStatus.subscribe(message => this.whatIsRoleUser = message)
  }

  public getClothingTypes(): void{
    this.clothingTypeService.getClothingTypes().subscribe((response: any[]) => {
      const clothingTypes: ClothingType[] = response
      for (let i = 0; i < clothingTypes.length; i++) {
        this.selectedClothingTypes.push(clothingTypes[i].type);
        this.allClothingTypes.push(clothingTypes[i].type);
      }
    })
  }

  public getTargetAudiences(): void{
    this.targetAudienceService.getTargetAudiences().subscribe((response: any[]) => {
      const targetAudiences: TargetAudience[] = response
      for (let i = 0; i < targetAudiences.length; i++) {
        this.selectedTargetAudience.push(targetAudiences[i].audience)
        this.allTargetAudience.push(targetAudiences[i].audience)
      }
    })
  }

  public onClothingTypeFilterChange(selectedClothingTypes: string[]): void {
    this.selectedClothingTypes = selectedClothingTypes;
    this.getProducts();
  }

  public onCheckboxChangeTargetAudience(selectedTargetAudience: string[]): void {
    this.selectedTargetAudience = selectedTargetAudience;
    this.getProducts();
  }

  public getProducts(): void {
    this.productService.getProducts().subscribe((response: Product[]) => {
        this.products = response.filter(product =>
          this.selectedClothingTypes.includes(product.clothingType?.type ?? '') &&
          this.selectedTargetAudience.includes(product.targetAudience?.audience ?? '')
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
