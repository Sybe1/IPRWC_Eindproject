import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TargetAudience} from "../models/target-audience";

@Injectable({
  providedIn: 'root'
})
export class TargetAudienceService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getTargetAudiences(): Observable<TargetAudience[]> {
    return this.http.get<TargetAudience[]>(`${this.apiServerUrl}/targetAudience/all`);
  }

  public getTargetAudienceById(code: any): Observable<TargetAudience> {
    return this.http.get<TargetAudience>(`${this.apiServerUrl}/targetAudience/find/` + code);
  }

  public addTargetAudience(targetAudience: TargetAudience): Observable<TargetAudience> {
    return this.http.post<TargetAudience>(`${this.apiServerUrl}/targetAudience/add`, targetAudience);
  }

  public updateTargetAudience(targetAudience: TargetAudience): Observable<TargetAudience> {
    return this.http.put<TargetAudience>(`${this.apiServerUrl}/targetAudience/update`, targetAudience);
  }

  public deleteTargetAudience(targetAudience: string){
    return this.http.delete<void>(`${this.apiServerUrl}/targetAudience/delete/${targetAudience}`);
  }
}
