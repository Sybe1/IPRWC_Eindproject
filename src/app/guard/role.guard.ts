import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WhatIsRoleUserService } from "../services/what-is-role-user.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  public whatIsRoleUser: string = "";

  constructor(private router: Router, private whatIsRoleUserService: WhatIsRoleUserService) {
    this.whatIsRoleUserService.currentStatus.subscribe(message => this.whatIsRoleUser = message);
  }

  public canActivate(): boolean {
    this.whatIsRoleUserService.currentStatus.subscribe(message => this.whatIsRoleUser = message);
    if (this.whatIsRoleUser === 'ADMIN') {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
