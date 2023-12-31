import {Component, OnInit} from '@angular/core';
import {IsUserLoggedInService} from "../../services/is-user-logged-in.service";
import {WhatIsRoleUserService} from "../../services/what-is-role-user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
   public isLoggedOut: boolean = true;
   public whatIsRoleUser: string = "";

   constructor(private isUserLoggedInService: IsUserLoggedInService, private whatIsRoleUserService: WhatIsRoleUserService) {
   }
   ngOnInit() {
     this.isUserLoggedInService.currentStatus.subscribe(message=> this.isLoggedOut = message)
     this.whatIsRoleUserService.currentStatus.subscribe(message=> this.whatIsRoleUser = message)
   }
}
