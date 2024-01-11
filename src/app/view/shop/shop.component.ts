import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../models/product';
import {PopUpUpdateProductComponent} from "./pop-up-update-product/pop-up-update-product.component";
import {WhatIsRoleUserService} from "../../services/what-is-role-user.service";
import {ClothingTypeService} from "../../services/clothing-type.service";
import {ClothingType} from "../../models/clothing-type";
import {TargetAudience} from "../../models/target-audience";
import {TargetAudienceService} from "../../services/target-audience.service";
import {OpenPopUpService} from "../../services/open-pop-up.service";
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  public products: Product[] = [];
  public TITLE_OF_PAGE: string = "Shop";
  public whatIsRoleUser: string = "";
  protected readonly PopUpUpdateProductComponent = PopUpUpdateProductComponent;

  public allClothingTypes: string[] = [];
  public selectedClothingTypes: string[] = [];

  public allTargetAudience: string[] = [];
  public selectedTargetAudience: string[] = [];

  constructor(private productService: ProductService, private whatIsRoleUserService: WhatIsRoleUserService,
              private clothingTypeService: ClothingTypeService, private targetAudienceService: TargetAudienceService,
              public openPopUpService: OpenPopUpService){
  }

  public ngOnInit(): void{
    this.getClothingTypes();
    this.getTargetAudiences();
    this.getAllProducts();
    this.whatIsRoleUserService.currentStatus.subscribe(message => this.whatIsRoleUser = message)
  }

  public getClothingTypes(): void{
    this.clothingTypeService.getClothingTypes().subscribe((response: any[]) => {
      const clothingTypes: ClothingType[] = response
      for (let i:number = 0; i < clothingTypes.length; i++) {
        this.selectedClothingTypes.push(clothingTypes[i].type);
        this.allClothingTypes.push(clothingTypes[i].type);
      }
    })
  }

  public getTargetAudiences(): void{
    this.targetAudienceService.getTargetAudiences().subscribe((response: any[]) => {
      const targetAudiences: TargetAudience[] = response
      for (let i:number = 0; i < targetAudiences.length; i++) {
        this.selectedTargetAudience.push(targetAudiences[i].audience)
        this.allTargetAudience.push(targetAudiences[i].audience)
      }
    })
  }

  public onClothingTypeFilterChange(selectedClothingTypes: string[]): void {
    this.selectedClothingTypes = selectedClothingTypes;
    this.getSelectedProducts();
  }

  public onCheckboxChangeTargetAudience(selectedTargetAudience: string[]): void {
    this.selectedTargetAudience = selectedTargetAudience;
    this.getSelectedProducts();
  }

  public getSelectedProducts(): void {
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

  public getAllProducts(): void {
    this.productService.getProducts().subscribe((response: Product[]) => {
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
