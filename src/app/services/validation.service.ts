import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService{



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
