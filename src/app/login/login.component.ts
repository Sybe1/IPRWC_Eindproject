import { Component } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";

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

    constructor(private http:HttpClient, private router: Router) {
    }

  onLogin() {
    this.http.post('http://localhost:8080/auth/authenticate', this.loginObj).subscribe((res:any)=>{
      localStorage.setItem('loginToken', res.token);
      this.router.navigateByUrl('/home')
    })
  }
}
