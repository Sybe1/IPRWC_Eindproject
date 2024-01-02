import {Component, Inject, OnInit, Output, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../models/product";
import {ClothingType} from "../../../models/clothing-type";
import {TargetAudience} from "../../../models/target-audience";
import {ClothingTypeService} from "../../../services/clothing-type.service";
import {TargetAudienceService} from "../../../services/target-audience.service";
@Component({
  selector: 'app-pop-up-update-product',
  templateUrl: './pop-up-update-product.component.html',
  styleUrls: ['./pop-up-update-product.component.scss']
})
export class PopUpUpdateProductComponent implements OnInit{
  clothingTypes: ClothingType[] = [];
  targetAudiences: TargetAudience[] = [];
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  public formProduct:FormGroup = this.buildr.group({
    id: '',
    productName: '',
    description: '',
    price: this.buildr.control(0, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    stock: this.buildr.control(0, [Validators.required, Validators.pattern(/^\d+$/)]),
    clothingTypeId: '',
    targetAudienceId: '',
    imageUrl: '',
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<PopUpUpdateProductComponent>,
              private buildr:FormBuilder, private service:ProductService, private clothingTypeService: ClothingTypeService,
              private targetAudienceService: TargetAudienceService) {
  }
  public ngOnInit(): void {
    this.updateProduct(this.data.code);
    this.clothingTypeService.getClothingTypes().subscribe((response:ClothingType[]) => {
      this.clothingTypes = response;
    })
    this.targetAudienceService.getTargetAudiences().subscribe((response:TargetAudience[]) => {
      this.targetAudiences = response;
    })
  }

  public closePopup(): void{
    this.ref.close('Closed using function');
    this.onClose.emit();
  }

  public updateProduct(code:any): void{
    if (this.data.code != undefined) {
      this.service.getProductsById(code).subscribe(item => {
        this.formProduct.setValue(
          {
            id: item.id,
            productName: item.productName,
            description: item.description,
            price: item.price,
            stock: item.stock,
            clothingTypeId: item.clothingType.id,
            targetAudienceId: item.targetAudience.id,
            imageUrl: item.imageUrl
          })
      })
    }
  }

  public saveProduct(): void {
    if (this.conditions()) {
      const productData: Product = {
        id: this.formProduct.value.id || '',
        productName: this.formProduct.value.productName || '',
        description: this.formProduct.value.description || '',
        price: this.formProduct.value.price || 0,
        stock: this.formProduct.value.stock || 0,
        clothingType: {
          id: this.formProduct.value.clothingTypeId || '',
        },
        targetAudience: {
          id: this.formProduct.value.targetAudienceId || '',
        },
        imageUrl: this.formProduct.value.imageUrl || ''
      };
      this.service.updateProduct(productData).subscribe(res => {
        this.closePopup();
      });
    }
  }

  public conditions(): boolean{
    if (this.formProduct.value.price != null && this.formProduct.value.price >= 0){
      if (this.formProduct.value.stock != null && this.formProduct.value.stock >= 0){
        if (this.formProduct.value.productName != null && this.formProduct.value.productName != ""){
          if (this.formProduct.value.description != null && this.formProduct.value.description != ""){
            if (this.formProduct.value.imageUrl != null && this.formProduct.value.imageUrl != "") {
              return true
            }
          }
        }
      }
    }
    return false
  }
}
