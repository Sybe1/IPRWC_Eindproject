import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {UserService} from "../../services/user.service";
import {IsUserLoggedInService} from "../../services/is-user-logged-in.service";
import {jwtDecode} from "jwt-decode/build/esm";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent{
  isLoginMode = true;
  isLoginOrLogout = localStorage.getItem('loginToken') == null;
  private usernameHelp: string = "";
  private passwordHelp: string = "";
  namePageLogin: string = "Login";
  namePageLogout: string = "Logout";


  loginObj: any = {
    "username": "",
    "password": ""
  }

  signUpObj: any = {
    "username": "",
    "password": "",
    "firstName": "",
    "lastName": "",
    "role": "CUSTOMER",
    "email": "",
    "address": "",
    "postalCode": ""
  }

  constructor(private router: Router, private loginService: LoginService,
              private userService: UserService, private data: IsUserLoggedInService) {
  }

  public changeValueLoginOrLogout(isLoggedOut: boolean):void{
    this.data.changeStatus(isLoggedOut)
  }

  public onSwitchMode(): void{
    this.isLoginMode = !this.isLoginMode;
  }

  public onLogin(): void {
    if (this.isLoginMode) {
      this.userLogin();
    }
    else if (!this.isLoginMode) {
      this.userRegister();
    }
  }

  public userLogin():void{
    this.loginService.postUser(this.loginObj).subscribe((res: any) => {
      localStorage.setItem('loginToken', res.token);
      this.userService.getUserByUsername(this.loginObj.username).subscribe((resUser: any) => {
        localStorage.setItem('role', resUser.role);
      })
      this.changeValueLoginOrLogout(false);
      this.router.navigateByUrl('/home');
    })
  }

  public userRegister():void{
    this.loginService.registerUser(this.signUpObj).subscribe((res: any) => {
      this.usernameHelp = this.signUpObj.username;
      this.passwordHelp = this.signUpObj.password;
      this.onSwitchMode();
      this.loginObj.username = this.usernameHelp;
      this.loginObj.password = this.passwordHelp;
    })
  }

}
