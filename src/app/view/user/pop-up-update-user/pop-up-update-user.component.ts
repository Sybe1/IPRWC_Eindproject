import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {WhatIsRoleUserService} from "../../../services/what-is-role-user.service";

@Component({
  selector: 'app-pop-up-update-user',
  templateUrl: './pop-up-update-user.component.html',
  styleUrl: './pop-up-update-user.component.scss'
})
export class PopUpUpdateUserComponent {
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  public password: string = '';
  public whatIsRoleUser: string = "";

  public formUser:FormGroup = this.buildr.group({
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    address: '',
    postalCode: '',
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<PopUpUpdateUserComponent>,
              private buildr:FormBuilder, private userService: UserService, private whatIsRoleUserService: WhatIsRoleUserService) {
    this.whatIsRoleUserService.currentStatus.subscribe(message => this.whatIsRoleUser = message);
  }
  ngOnInit(): void {
    this.updateUser(this.data.code);
  }
  public closePopup(): void{
    this.ref.close('Closed using function');
    this.onClose.emit();
  }

  public updateUser(code:any): void{
    if (this.data.code != undefined) {
      this.userService.getUserByUsername(code).subscribe(item => {
        this.formUser.setValue({
          firstName: item.firstName,
          lastName: item.lastName,
          role: item.role,
          email: item.email,
          address: item.address,
          postalCode: item.postalCode,
        })
        this.password = item.password;
      })
    }
  }

  public saveUser(): void {
    const userData: User = {
      firstName:this.formUser.value.firstName || '',
      lastName:this.formUser.value.lastName || '',
      role: this.formUser.value.role || '',
      email: this.formUser.value.email || '',
      address:this.formUser.value.address || '',
      postalCode:this.formUser.value.postalCode || '',
      username: this.data.code || '',
      password: this.password,
    };
    this.userService.updateUser(userData).subscribe(res => {
      this.closePopup();
      console.log(res)
    });
  }
}
