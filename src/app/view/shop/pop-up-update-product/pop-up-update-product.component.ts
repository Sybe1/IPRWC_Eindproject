import {Component, Inject, OnInit, Output, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../models/product";
import {User} from "../../../models/user";
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


  myform = this.buildr.group({
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
    this.service.getProductsById(code).subscribe(item=>{
      console.log("Dit is het item ")
      console.log(item)
      this.myform.setValue(
        {
          id:item.id,
          productName:item.productName,
          description:item.description,
          price: item.price,
          stock: item.stock,
          clothingTypeId: item.clothingType.id,
          targetAudienceId: item.targetAudience.id,
          imageUrl: item.imageUrl
        })
    })
  }

  public saveProduct(): void {
    if (this.conditions()) {
      const productData: Product = {
        id: this.myform.value.id || '',
        productName: this.myform.value.productName || '',
        description: this.myform.value.description || '',
        price: this.myform.value.price || 0,
        stock: this.myform.value.stock || 0,
        clothingType: {
          id: this.myform.value.clothingTypeId || '',
        },
        targetAudience: {
          id: this.myform.value.targetAudienceId || '',
        },
        imageUrl: this.myform.value.imageUrl || ''
      };
      this.service.updateProduct(productData).subscribe(res => {
        this.closePopup();
      });
    }
  }

  public conditions(): boolean{
    if (this.myform.value.price != null && this.myform.value.price >= 0){
      if (this.myform.value.stock != null && this.myform.value.stock >= 0){
        if (this.myform.value.productName != null && this.myform.value.productName != ""){
          if (this.myform.value.description != null && this.myform.value.description != ""){
            if (this.myform.value.imageUrl != null && this.myform.value.imageUrl != "") {
              return true
            }
          }
        }
      }
    }
    return false
  }
}
