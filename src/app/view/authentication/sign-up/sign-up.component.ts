import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {ValidationService} from "../../../services/validation.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  @Input() public signUpObj: User = {
    "username": "",
    "password": "",
    "firstName": "",
    "lastName": "",
    "role": "CUSTOMER",
    "email": "",
    "address": "",
    "postalCode": ""
  }
  private users: User[] = [];
  public showPassword: boolean = false;


  constructor(public validationService: ValidationService, private userService: UserService) {
  }

  public ngOnInit(): void {
    this.userService.getAllUsers().subscribe((response: any[]) => {
      this.users = response
    })
  }

  public isEmailUsed(email: string): boolean{
    for (let i:number = 0; i < this.users.length; i++) {
      if (this.users[i].email == email){
        return true;
      }
    }
    return false
  }

  public isUsernameUsed(username: string): boolean{
    for (let i:number = 0; i < this.users.length; i++) {
      if (this.users[i].username == username){
        return true;
      }
    }
    return false
  }
}
