import {Component, OnInit} from '@angular/core';
import {IsUserLoggedInService} from "../../services/is-user-logged-in.service";
import {WhatIsRoleUserService} from "../../services/what-is-role-user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{
  public NAMEPAGE: string = "User";
  public whatIsRoleUser: string = "";

  constructor(private whatIsRoleUserService: WhatIsRoleUserService) {
  }
  ngOnInit() {
    this.whatIsRoleUserService.currentStatus.subscribe(message => this.whatIsRoleUser = message)
  }
}
