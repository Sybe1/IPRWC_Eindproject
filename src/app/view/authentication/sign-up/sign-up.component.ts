import {Component, Input} from '@angular/core';
import {User} from "../../../models/user";
import {ValidationService} from "../../../services/validation.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  @Input() public signUpObj: User = {
    "username": "",
    "password": "",
    "firstName": "",
    "lastName": "",
    "role": "CUSTOMER",
    "email": "",
    "address": "",
    "postalCode": ""
  }

  constructor(public validationService: ValidationService) {
  }
}
