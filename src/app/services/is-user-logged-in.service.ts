import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {jwtDecode} from 'jwt-decode';
import {JwtPayload} from "../models/jwt-payload";
import {UserService} from "./user.service";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class IsUserLoggedInService {
  private isLoggedOut = new BehaviorSubject<boolean>(this.isUserLoggedOut())
  currentStatus = this.isLoggedOut.asObservable()
  tokenJWT: string = ""
  constructor(private userService: UserService) { }

  //@ts-ignore
  public isUserLoggedOut():boolean{
    if (localStorage.getItem("loginToken")) {
      this.tokenJWT = localStorage.getItem("loginToken")!
      const decodedJWT = jwtDecode(this.tokenJWT) as JwtPayload
      this.userService.getAllUsers().subscribe((response: User[]) => {
        for (let i = 0; i < response.length; i++) {
          return decodedJWT.sub !== response[i].username;
        }
      })
    }
    else {
      return true;
    }
  }

  // public whatIsRoleUser():string{
  //   if (localStorage.getItem("loginToken")) {
  //     this.tokenJWT = localStorage.getItem("loginToken")!
  //     const decodedJWT = jwtDecode(this.tokenJWT) as JwtPayload
  //     return decodedJWT.role[0].authority
  //   }
  //   else{
  //     return ""
  //   }
  // }

  // @ts-ignore
  // public decodeTokenJWT():JwtPayload{
  //   if (localStorage.getItem("loginToken")) {
  //     this.tokenJWT = localStorage.getItem("loginToken")!
  //     return jwtDecode(this.tokenJWT) as JwtPayload
  //   }
  // }

  public changeStatus(isLoggedOut: boolean):void{
    this.isLoggedOut.next(isLoggedOut)
  }
}
