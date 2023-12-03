import { Injectable } from '@angular/core';
import {environment} from "../../environment/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public postUser(loginObj: any) {
    return this.http.post(`${this.apiServerUrl}/auth/authenticate`, loginObj);
  }

  public registerUser(registerObj: any) {
    console.log(registerObj)
    return this.http.post(`${this.apiServerUrl}/auth/register`, registerObj );
  }
}
