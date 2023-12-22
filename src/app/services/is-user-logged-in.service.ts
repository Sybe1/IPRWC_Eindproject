import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IsUserLoggedInService {

  private loginOrLogoutValue = new BehaviorSubject<boolean>(true)
  currentStatus = this.loginOrLogoutValue.asObservable()
  constructor() { }

  changeStatus(loginOrLogout: boolean){
    this.loginOrLogoutValue.next(loginOrLogout)
  }
}
