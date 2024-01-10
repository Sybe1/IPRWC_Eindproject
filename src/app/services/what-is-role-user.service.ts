import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from "../models/jwt-payload";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WhatIsRoleUserService {
  private roleUser = new BehaviorSubject<string>("");
  public currentStatus = this.roleUser.asObservable();
  public tokenJWT: string = "";

  constructor() {
    this.roleUser.next(this.whatIsRoleUser());
  }

  public whatIsRoleUser(): string {
    if (localStorage.getItem("loginToken")) {
      this.tokenJWT = localStorage.getItem("loginToken")!;
      const decodedJWT: JwtPayload = jwtDecode(this.tokenJWT) as JwtPayload;
      if (decodedJWT.role && decodedJWT.role.length > 0) {
        return decodedJWT.role[0].authority;
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  public changeStatus(whatRoleUser: string): void {
    this.roleUser.next(whatRoleUser);
  }
}
