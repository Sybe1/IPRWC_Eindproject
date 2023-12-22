import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginService} from "../../../services/login.service";
import {UserService} from "../../../services/user.service";
import {IsUserLoggedInService} from "../../../services/is-user-logged-in.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  @Input() public loginObj: any = {
    "username": "",
    "password": "",
  }
}
