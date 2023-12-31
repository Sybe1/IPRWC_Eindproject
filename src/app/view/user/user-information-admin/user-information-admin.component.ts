import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../services/order.service";
import {MatDialog} from "@angular/material/dialog";
import {PopUpUpdateOrderComponent} from "../../order/pop-up-update-order/pop-up-update-order.component";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {PopUpUpdateUserComponent} from "../pop-up-update-user/pop-up-update-user.component";

@Component({
  selector: 'app-user-information-admin',
  templateUrl: './user-information-admin.component.html',
  styleUrl: './user-information-admin.component.scss'
})
export class UserInformationAdminComponent implements OnInit{
  public users: User[] = [];

  constructor(private userService: UserService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void{
    this.userService.getAllUsers().subscribe((response: any[]) => {
      this.users = response
    })
  }

  public deleteUser(userId: string): void{
    if(confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        (resp) => {
          console.log(resp)
          this.getUsers();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  public openPopup(code:string, title :string): void{
    const dialogRef = this.dialog.open(PopUpUpdateUserComponent,{
      width:'18%',
      data: {
        title: title,
        code: code
      }
    });
    dialogRef.componentInstance.onClose.subscribe(() => {
      this.getUsers();
    });
  }
}
