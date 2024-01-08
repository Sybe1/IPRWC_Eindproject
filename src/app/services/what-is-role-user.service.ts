import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {JwtPayload} from "../models/jwt-payload";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WhatIsRoleUserService {
  private roleUser = new BehaviorSubject<string>(this.whatIsRoleUser())
  public currentStatus = this.roleUser.asObservable()
  public tokenJWT: string = ""
  constructor() { }

  public whatIsRoleUser():string{
    if (localStorage.getItem("loginToken")) {
      this.tokenJWT = localStorage.getItem("loginToken")!
      const decodedJWT:JwtPayload = jwtDecode(this.tokenJWT) as JwtPayload
      return decodedJWT.role[0].authority
    }
    else{
      return ""
    }
  }

  public changeStatus(whatRoleUser: string):void{
    this.roleUser.next(whatRoleUser)
  }
}
