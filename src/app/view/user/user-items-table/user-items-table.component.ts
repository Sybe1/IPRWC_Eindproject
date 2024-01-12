import {Component, Input, OnInit} from '@angular/core';
import {PopUpUpdateUserComponent} from "../pop-up-update-user/pop-up-update-user.component";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {User} from "../../../models/user";
import {OpenPopUpService} from "../../../services/open-pop-up.service";
import {UserService} from "../../../services/user.service";
import {UserInformationAdminComponent} from "../user-information-admin/user-information-admin.component";
import {WhatIsRoleUserService} from "../../../services/what-is-role-user.service";

@Component({
  selector: 'app-user-items-table',
  standalone: true,
  imports: [
    MatIconModule,
    NgIf
  ],
  providers: [
    UserInformationAdminComponent
  ],
  templateUrl: './user-items-table.component.html',
  styleUrl: './user-items-table.component.scss'
})
export class UserItemsTableComponent implements OnInit{
  protected readonly PopUpUpdateUserComponent = PopUpUpdateUserComponent;
  public whatIsRoleUser: string = 'CUSTOMER';
  @Input() public user: User = <User>{};

  constructor(public openPopUpService: OpenPopUpService, private userService: UserService,
              private whatIsRoleUserService: WhatIsRoleUserService) {
  }

  ngOnInit() {
    this.whatIsRoleUserService.currentStatus.subscribe(message => this.whatIsRoleUser = message)
  }

  public deleteUser(userId: string): void{
    if(confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        (resp) => {
          console.log(resp)
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
