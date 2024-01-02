import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {PopUpUpdateUserComponent} from "../pop-up-update-user/pop-up-update-user.component";
import {OpenPopUpService} from "../../../services/open-pop-up.service";

@Component({
  selector: 'app-user-information-admin',
  templateUrl: './user-information-admin.component.html',
  styleUrl: './user-information-admin.component.scss'
})
export class UserInformationAdminComponent implements OnInit{
  public users: User[] = [];
  protected readonly PopUpUpdateUserComponent = PopUpUpdateUserComponent;

  constructor(private userService: UserService, public openPopUpService: OpenPopUpService) {
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
}
