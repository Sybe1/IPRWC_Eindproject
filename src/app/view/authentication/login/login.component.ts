import {Component, EventEmitter, Input, Output} from '@angular/core';
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

  @Output() captchaResolved: EventEmitter<string|null> = new EventEmitter<string | null>();

  public wasCaptchaSuccesful(captchaResponse: string | null): void {
    this.captchaResolved.emit(captchaResponse);
  }
}
