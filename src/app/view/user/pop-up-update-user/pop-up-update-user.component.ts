import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {TargetAudienceService} from "../../../services/target-audience.service";
import {TargetAudience} from "../../../models/target-audience";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-pop-up-update-user',
  templateUrl: './pop-up-update-user.component.html',
  styleUrl: './pop-up-update-user.component.scss'
})
export class PopUpUpdateUserComponent {
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  password: string = '';
  valueRoleNotChangeable: boolean = false;

  myform = this.buildr.group({
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    address: '',
    postalCode: '',
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<PopUpUpdateUserComponent>,
              private buildr:FormBuilder, private userService: UserService) {
  }
  ngOnInit(): void {
    this.updateUser(this.data.code);
  }
  public closePopup(): void{
    this.ref.close('Closed using function');
    this.onClose.emit();
  }

  public updateUser(code:any): void{
    this.userService.getUserByUsername(code).subscribe(item=>{
      this.myform.setValue({
        firstName:item.firstName,
        lastName:item.lastName,
        role: item.role,
        email: item.email,
        address:item.address,
        postalCode:item.postalCode,
      })
      if (item.role == "ADMIN"){
        this.valueRoleNotChangeable = true;
      }
      this.password = item.password;
    })
  }

  public saveUser(): void {
    const userData: User = {
      firstName:this.myform.value.firstName || '',
      lastName:this.myform.value.lastName || '',
      role: this.myform.value.role || '',
      email: this.myform.value.email || '',
      address:this.myform.value.address || '',
      postalCode:this.myform.value.postalCode || '',
      username: this.data.code || '',
      password: this.password,
    };
    this.userService.updateUser(userData).subscribe(res => {
      this.closePopup();
      console.log(res)
    });
  }
}
