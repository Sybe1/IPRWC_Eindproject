import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {UserService} from "../../services/user.service";
import {IsUserLoggedInService} from "../../services/is-user-logged-in.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
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
      this.loginService.postUser(this.loginObj).subscribe((res: any) => {
        localStorage.setItem('loginToken', res.token);
        console.log(res.token);
        this.userService.getUserByUsername(this.loginObj.username).subscribe((resUser: any) => {
          localStorage.setItem('role', resUser.role);
          console.log("role: " + localStorage.getItem('role'));
        })
        this.changeValueLoginOrLogout(false);
        this.router.navigateByUrl('/home');
      })
    }
    else if (!this.isLoginMode) {
      this.loginService.registerUser(this.signUpObj).subscribe((res: any) => {
        this.usernameHelp = this.signUpObj.username;
        this.passwordHelp = this.signUpObj.password;
        this.onSwitchMode();
        this.loginObj.username = this.usernameHelp;
        this.loginObj.password = this.passwordHelp;
      })
    }
  }
}
