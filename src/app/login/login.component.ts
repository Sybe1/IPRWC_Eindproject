import { Component } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";
import {Product} from "../product/product";
import {LoginService} from "./login.service";
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    loginObj: any = {
      "username": "",
      "password": ""
    }

    constructor(private http:HttpClient, private router: Router, private loginService: LoginService,
                private userService: UserService) {
    }

  onLogin() {
    this.loginService.postUser(this.loginObj).subscribe((res:any ) => {
      localStorage.setItem('loginToken', res.token);
      console.log(res.token);
      this.userService.getUserByUsername(this.loginObj.username).subscribe((resUser:any)=> {
        console.log("role: " + resUser.role);
      })
      this.router.navigateByUrl('/home');
    })
  }
}
