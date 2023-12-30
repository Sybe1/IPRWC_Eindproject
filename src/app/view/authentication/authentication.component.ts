import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {IsUserLoggedInService} from "../../services/is-user-logged-in.service";
import {WhatIsRoleUserService} from "../../services/what-is-role-user.service";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit{
  isLoginMode: boolean = true;
  isLoggedOut: boolean = true;
  captcha: string = ""
  roleUser: string = "";
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

  constructor(private router: Router, private loginService: LoginService, private isUserLoggedInService: IsUserLoggedInService,
              private whatIsRoleUserService: WhatIsRoleUserService) {
  }

  ngOnInit() {
    this.isUserLoggedInService.currentStatus.subscribe(message => this.isLoggedOut = message)
    this.whatIsRoleUserService.currentStatus.subscribe(message => this.roleUser = message)
  }

  public changeValueLoginOrLogout(isLoggedOut: boolean): void{
    this.isUserLoggedInService.changeStatus(isLoggedOut)
  }

  public changeValueRoleUser(userRole: string): void{
    this.whatIsRoleUserService.changeStatus(userRole)
  }

  public onSwitchMode(): void{
    this.isLoginMode = !this.isLoginMode;
  }

  public wasCaptchaSuccesful(captchaResponse: string): void {
    this.captcha = captchaResponse;
  }

  public onLogin(): void {
    if (this.isLoginMode && this.captcha) {
      this.userLogin();
    }
    else if (!this.isLoginMode) {
      this.userRegister();
    }
  }

  public userLogin():void{
    this.loginService.postUser(this.loginObj).subscribe((res: any) => {
      localStorage.setItem('loginToken', res.token);
      this.changeValueLoginOrLogout(false);
      this.roleUser = this.whatIsRoleUserService.whatIsRoleUser();
      this.changeValueRoleUser(this.roleUser);
      this.router.navigateByUrl('/home');
    })
  }

  public userRegister():void{
    this.loginService.registerUser(this.signUpObj).subscribe()
    this.usernameHelp = this.signUpObj.username;
    this.passwordHelp = this.signUpObj.password;
    this.onSwitchMode();
    this.loginObj.username = this.usernameHelp;
    this.loginObj.password = this.passwordHelp;
  }

}
