import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {OpenPopUpService} from "../../../services/open-pop-up.service";

@Component({
  selector: 'app-user-information-admin',
  templateUrl: './user-information-admin.component.html',
  styleUrl: './user-information-admin.component.scss'
})
export class UserInformationAdminComponent implements OnInit{
  public users: User[] = [];

  constructor(private userService: UserService, public openPopUpService: OpenPopUpService) {
  }
  public ngOnInit():void {
    this.getUsers();
  }

  public getUsers(): void{
    this.userService.getAllUsers().subscribe((response: any[]) => {
      this.users = response
    })
  }
}
