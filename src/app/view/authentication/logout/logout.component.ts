import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {IsUserLoggedInService} from "../../../services/is-user-logged-in.service";
import {WhatIsRoleUserService} from "../../../services/what-is-role-user.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private router: Router, private isUserLoggedInService: IsUserLoggedInService,
              private whatIsRoleUserService: WhatIsRoleUserService) {
  }
  public logoutButton(): void{
    localStorage.removeItem('loginToken');
    localStorage.removeItem('role');
    localStorage.removeItem('shoppingCart');
    localStorage.removeItem('liked');
    this.router.navigateByUrl('/home');
    this.changeValueLoginOrLogout(true);
    this.changeValueRoleUser("");
  }

  public changeValueLoginOrLogout(loggedOut: boolean):void{
    this.isUserLoggedInService.changeStatus(loggedOut)
  }

  public changeValueRoleUser(userRole: string):void{
    this.whatIsRoleUserService.changeStatus(userRole)
  }
}
