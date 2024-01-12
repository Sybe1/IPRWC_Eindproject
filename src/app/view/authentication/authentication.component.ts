import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {IsUserLoggedInService} from "../../services/is-user-logged-in.service";
import {WhatIsRoleUserService} from "../../services/what-is-role-user.service";
import {User} from "../../models/user";
import {ValidationService} from "../../services/validation.service";
import {SignUpComponent} from "./sign-up/sign-up.component";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit{
  public isLoginMode: boolean = true;
  public isLoggedOut: boolean = true;
  public captcha: string = ""
  private usernameHelp: string = "";
  private passwordHelp: string = "";


  public loginObj: any = {
    "username": "",
    "password": ""
  }

  public signUpObj: User = {
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
              private whatIsRoleUserService: WhatIsRoleUserService, private validationService: ValidationService,
              private signUpComponent: SignUpComponent) {
  }

  public ngOnInit(): void {
    this.isUserLoggedInService.currentStatus.subscribe(message => this.isLoggedOut = message)
  }

  public isUserLoggedOut(isLoggedOut: boolean): void{
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
      this.isUserLoggedOut(false);
      this.changeValueRoleUser(this.whatIsRoleUserService.whatIsRoleUser());
      this.router.navigateByUrl('/home');
    })
  }

  public userRegister():void{
    if (this.signUpObj.username && this.signUpObj.email &&
    this.signUpObj.password && this.signUpObj.address && this.signUpObj.postalCode
    && this.signUpObj.firstName && this.signUpObj.lastName &&
    this.validationService.isEmailValid(this.signUpObj.email) && this.validationService.isPasswordValid(this.signUpObj.password)
    && this.validationService.isPostalCodeValid(this.signUpObj.postalCode) && !this.signUpComponent.isEmailUsed(this.signUpObj.email)
      && !this.signUpComponent.isUsernameUsed(this.signUpObj.username)){
      this.loginService.registerUser(this.signUpObj).subscribe()
      this.usernameHelp = this.signUpObj.username;
      this.passwordHelp = this.signUpObj.password;
      this.onSwitchMode();
      this.loginObj.username = this.usernameHelp;
      this.loginObj.password = this.passwordHelp;
    }
  }
}
