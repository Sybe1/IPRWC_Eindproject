import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {IsUserLoggedInService} from "../../../services/is-user-logged-in.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private router: Router, private data: IsUserLoggedInService) {
  }
  public logoutButton(): void{
    localStorage.removeItem('loginToken');
    localStorage.removeItem('role');
    localStorage.removeItem('shoppingCart');
    localStorage.removeItem('liked');
    this.router.navigateByUrl('/home');
    this.changeValueLoginOrLogout(true)
  }

  public changeValueLoginOrLogout(loggedOut: boolean):void{
    this.data.changeStatus(loggedOut)
  }
}
