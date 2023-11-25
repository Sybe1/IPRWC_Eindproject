import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from './product';
import { NgForm } from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import {PopUpUpdateProductComponent} from "../pop-up-update-product/pop-up-update-product.component";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  products: any[] = [];

  allClothingTypes: string[] = [ "HOODIE", "SHIRT", "PANTS", "UNDERWEAR",
    "SOCKS", "SHOES", "JACKET", "HAT"]
  selectedClothingTypes: string[] = [ "HOODIE", "SHIRT", "PANTS", "UNDERWEAR",
    "SOCKS", "SHOES", "JACKET", "HAT"]

  allTargetAudience: string[] = [ "MEN", "WOMEN", "UNISEX", "CHILDREN"]
  selectedTargetAudience: string[] = [ "MEN", "WOMEN", "UNISEX", "CHILDREN"]

  constructor(private productService: ProductService, private dialog: MatDialog){

  }

  ngOnInit() {
    this.getProducts();
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
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response.filter(product =>
          this.selectedClothingTypes.includes(product.clothingType) &&
          this.selectedTargetAudience.includes(product.targetAudience)
        );
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteProduct(product: Product){
    if(confirm('Are you sure you want to delete this product?'))
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

  public editProduct(code: any){
    this.openPopup(code, 'Edit Product')
  }

  public addProduct(){
    this.openPopup(0, 'Add Product')
  }
  public openPopup(code:any, title:any){
    const dialogRef = this.dialog.open(PopUpUpdateProductComponent,{
      width:'60%',
      data: {
        title: title,
        code: code
      }
    });
    dialogRef.componentInstance.onClose.subscribe(() => {
      this.getProducts(); // Roep getProducts op wanneer het dialoogvenster wordt gesloten.
    });
  }

}
