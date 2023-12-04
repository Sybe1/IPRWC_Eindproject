import { Injectable } from '@angular/core';
import {environment} from "../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../product/product";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getUserByUsername(username: any): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/find/` + username);
  }
}