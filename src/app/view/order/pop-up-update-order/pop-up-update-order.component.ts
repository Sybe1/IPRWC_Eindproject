import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef,} from "@angular/material/dialog";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {OrderService} from "../../../services/order.service";
import {Product} from "../../../models/product";
import {Order} from "../../../models/order";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-pop-up-update-order',
  templateUrl: './pop-up-update-order.component.html',
  styleUrl: './pop-up-update-order.component.scss'
})
export class PopUpUpdateOrderComponent implements OnInit{
  products: Product[] = [];
  users: User[] = [];
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  myform = this.buildr.group({
    amount: 0,
    productId: '',
    username: ''
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<PopUpUpdateOrderComponent>,
              private buildr:FormBuilder, private service:OrderService, private productService: ProductService,
              private userService: UserService) {
  }
  public ngOnInit(): void {
    this.updateProduct(this.data.code);
    this.productService.getProducts().subscribe((response: any) => {
      this.products = response;
    });
    this.userService.getAllUsers().subscribe((response: any) => {
      this.users = response;
    });
  }

  public closePopup(): void{
    this.ref.close('Closed using function');
    this.onClose.emit();
  }

  public updateProduct(code:any): void{
    this.service.getOrdersById(code).subscribe(item=>{
      this.myform.setValue({
        amount:item.amount,
        productId: item.product.id,
        username: item.user.username
      })
    })
  }

  public saveProduct(): void {
    const orderData: Order = {
      id: this.data.code || '',
      amount: this.myform.value.amount || 0,
      product: {
        id: this.myform.value.productId || ''
      },
      user: {
        username: this.myform.value.username || '',
      }
    };
    this.service.updateOrder(orderData).subscribe(res => {
      this.closePopup();
      console.log(res)
    });
  }

}
