import {Injectable, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class ValidationService implements OnInit{
  private users: User[] = [];

  constructor(private userService: UserService) {
  }

  public ngOnInit(): void {
    this.userService.getAllUsers().subscribe((response: any[]) => {
      this.users = response
    })
  }

  public isEmailUsed(email: string): boolean{
    for (let i:number = 0; i < this.users.length; i++) {
      if (this.users[i].email == email){
        return true;
      }
    }
    return false
  }

  public isUsernameUsed(username: string): boolean{
    for (let i:number = 0; i < this.users.length; i++) {
      if (this.users[i].username == username){
        return true;
      }
    }
    return false
  }

  public isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public isPasswordValid(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }

  public isPostalCodeValid(postalCode: string): boolean {
    const postalCodeRegex = /^\d{4}[A-Z]{2}$/;
    return postalCodeRegex.test(postalCode);
  }
}
