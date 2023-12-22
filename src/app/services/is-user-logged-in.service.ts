import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IsUserLoggedInService {

  private loginOrLogoutValue = new BehaviorSubject<boolean>(this.isUserLoggedOut())
  currentStatus = this.loginOrLogoutValue.asObservable()
  constructor() { }

  public isUserLoggedOut():boolean{
    if (!localStorage.getItem("loginToken")){
      return true;
    }
    else {
      return false;
    }
  }

  public changeStatus(loginOrLogout: boolean):void{
    this.loginOrLogoutValue.next(loginOrLogout)
  }
}
