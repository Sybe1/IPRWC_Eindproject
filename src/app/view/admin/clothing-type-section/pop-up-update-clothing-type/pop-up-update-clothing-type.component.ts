import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {OrderService} from "../../../../services/order.service";
import {ProductService} from "../../../../services/product.service";
import {UserService} from "../../../../services/user.service";
import {Order} from "../../../../models/order";
import {ClothingTypeService} from "../../../../services/clothing-type.service";
import {ClothingType} from "../../../../models/clothing-type";

@Component({
  selector: 'app-pop-up-update-clothing-type',
  templateUrl: './pop-up-update-clothing-type.component.html',
  styleUrl: './pop-up-update-clothing-type.component.scss'
})
export class PopUpUpdateClothingTypeComponent implements OnInit{
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  myform = this.buildr.group({
    type: '',
    description: ''
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<PopUpUpdateClothingTypeComponent>,
              private buildr:FormBuilder, private clothingTypeService: ClothingTypeService) {
  }
  ngOnInit(): void {
    this.updateClothingType(this.data.code);
  }
  public closePopup(): void{
    this.ref.close('Closed using function');
    this.onClose.emit();
  }

  public updateClothingType(code:any): void{
    this.clothingTypeService.getClothingTypeById(code).subscribe(item=>{
      this.myform.setValue({
        type:item.type,
        description: item.description
      })
    })
  }

  public saveClothingType(): void {
    const clothingTypeData: ClothingType = {
      id: this.data.code || '',
      type: this.myform.value.type || '',
      description: this.myform.value.description || '',
    };
    this.clothingTypeService.updateClothingType(clothingTypeData).subscribe(res => {
      this.closePopup();
      console.log(res)
    });
  }

}
