import {Component, Inject, OnInit, Output, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
@Component({
  selector: 'app-pop-up-update-product',
  templateUrl: './pop-up-update-product.component.html',
  styleUrls: ['./pop-up-update-product.component.scss']
})
export class PopUpUpdateProductComponent implements OnInit{
  inputdata: any;
  editdata: any
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();


  myform = this.buildr.group({
    id: this.buildr.control(0),
    productName: this.buildr.control('', Validators.required),
    description: this.buildr.control('', Validators.required),
    price: this.buildr.control(0, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    stock: this.buildr.control(0, [Validators.required, Validators.pattern(/^\d+$/)]),
    clothingType: this.buildr.control('', Validators.required),
    targetAudience: this.buildr.control('', Validators.required),
    imageUrl: this.buildr.control('', Validators.required),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<PopUpUpdateProductComponent>,
              private buildr:FormBuilder, private service:ProductService) {
  }
  ngOnInit(): void {
    this.inputdata = this.data;
    if (this.inputdata.code > 0) {
      this.updateProduct(this.inputdata.code);
    }
  }

  public closePopup(){
    this.ref.close('Closed using function');
    this.onClose.emit();
  }

  public saveProduct() {
    const productData: Product = {
      id: this.myform.value.id || 0, // Handle the case where id is null or undefined
      productName: this.myform.value.productName || '',
      description: this.myform.value.description || '',
      price: this.myform.value.price || 0, // Ensure 2 decimal places
      stock: this.myform.value.stock || 0, // Ensure it's a valid integer
      clothingType: this.myform.value.clothingType || '',
      targetAudience: this.myform.value.targetAudience || '',
      imageUrl: this.myform.value.imageUrl || ''
    };
    this.service.updateProduct(productData).subscribe(res => {
      this.closePopup();
    });
  }

  public updateProduct(code:any){
    this.service.getProductsById(code).subscribe(item=>{
      this.editdata = item;
      this.myform.setValue({id:this.editdata.id, productName:this.editdata.productName, description:this.editdata.description,
      price: this.editdata.price, stock: this.editdata.stock, clothingType: this.editdata.clothingType, targetAudience: this.editdata.targetAudience,
      imageUrl: this.editdata.imageUrl})
    })
  }

}
