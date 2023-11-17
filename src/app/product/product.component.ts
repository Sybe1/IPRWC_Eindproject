import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from './product';
import { NgForm } from '@angular/forms';


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

  productToUpdate = {
    id: 0,
    productName: '',
    description: '',
    price: 0,
    stock: 0,
    clothingType: '',
    targetAudience: '',
    imageUrl: '',
  };

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  public onCheckboxChange(product: string): void{
    for (let i = 0; i < this.selectedClothingTypes.length; i++) {
      if (product === this.selectedClothingTypes[i]){
        this.selectedClothingTypes.splice(i, 1);
        this.getProducts()
        return;
      }
    }
    this.selectedClothingTypes.push(product)
    this.getProducts()
  }

  public getProducts(): void {
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response.filter(product =>
          this.selectedClothingTypes.includes(product.clothingType)
        );
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public addProducts(registerForm: NgForm): void {
    this.productService.addProducts(registerForm.value).subscribe(
      (resp) => {
        console.log(resp);
        this.getProducts();
      },
      (err) => {
        console.log(err);
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

  public editProduct(product: Product){
    this.productToUpdate = product;
  }

  public updateProduct(){
    this.productService.updateProduct(this.productToUpdate).subscribe(
      (resp) => {
        console.log(resp)
        this.getProducts();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
