import {Component, Input} from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  captcha: string|null = "";

  @Input() public loginObj: any = {
    "username": "",
    "password": "",
  }

  wasCaptchaSuccesful(captchaResponse:string|null):void{
    this.captcha = captchaResponse;
  }
}
