import { Component } from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {PopUpUpdateUserComponent} from "../pop-up-update-user/pop-up-update-user.component";
import {jwtDecode} from "jwt-decode";
import {JwtPayload} from "../../../models/jwt-payload";
import {OpenPopUpService} from "../../../services/open-pop-up.service";

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrl: './user-information.component.scss'
})
export class UserInformationComponent {
  public user: User | undefined;
  public userInList: User[] = []
  public username: string = '';

  constructor(private userService: UserService, public openPopUpService: OpenPopUpService) {
  }

  public ngOnInit(): void{
    const tokenJWT: JwtPayload = jwtDecode(localStorage.getItem("loginToken")!) as JwtPayload;
    this.username = tokenJWT.sub;
    this.getUser();
  }

  public getUser(): void{
    this.userService.getUserByUsername(this.username).subscribe((response: User) => {
      this.user = response;
      this.userInList = [response];
    })
  }
}
