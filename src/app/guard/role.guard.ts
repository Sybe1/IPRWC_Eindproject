import {Injectable, OnInit} from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {WhatIsRoleUserService} from "../services/what-is-role-user.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, OnInit {
  whatIsRoleUser: string = "";

  constructor(private router: Router, private whatIsRoleUserService: WhatIsRoleUserService) {}

  ngOnInit(): void {
    this.whatIsRoleUserService.currentStatus.subscribe(message => this.whatIsRoleUser = message)
  }
  canActivate(): boolean {
    if (this.whatIsRoleUser === 'ADMIN') {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }


}
