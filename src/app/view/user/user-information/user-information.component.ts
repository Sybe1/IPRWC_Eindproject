import { Component } from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {PopUpUpdateUserComponent} from "../pop-up-update-user/pop-up-update-user.component";
import {jwtDecode} from "jwt-decode";
import {JwtPayload} from "../../../models/jwt-payload";

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrl: './user-information.component.scss'
})
export class UserInformationComponent {
  public user: User | undefined;
  public username: string = '';

  constructor(private userService: UserService, private dialog: MatDialog) {
  }

  ngOnInit() {
    const tokenJWT = jwtDecode(localStorage.getItem("loginToken")!) as JwtPayload;
    this.username = tokenJWT.sub;
    this.getUser();
  }

  public getUser(): void{
    this.userService.getUserByUsername(this.username).subscribe((response: User) => {
      this.user = response
    })
  }

  public openPopup(code:any, title :any): void{
    const dialogRef = this.dialog.open(PopUpUpdateUserComponent,{
      width:'18%',
      data: {
        title: title,
        code: code
      }
    });
    dialogRef.componentInstance.onClose.subscribe(() => {
      this.getUser();
    });
  }
}
