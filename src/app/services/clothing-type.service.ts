import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClothingType} from "../models/clothing-type";

@Injectable({
  providedIn: 'root'
})
export class ClothingTypeService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  public getClothingTypes(): Observable<ClothingType[]> {
    return this.http.get<ClothingType[]>(`${this.apiServerUrl}/clothingType/all`);
  }
  public getClothingTypeById(code: any): Observable<ClothingType> {
    return this.http.get<ClothingType>(`${this.apiServerUrl}/clothingType/find/` + code);
  }
  public addClothingTypes(clothingType: ClothingType): Observable<ClothingType> {
    return this.http.post<ClothingType>(`${this.apiServerUrl}/clothingType/add`, clothingType);
  }
  public updateClothingType(clothingType: ClothingType): Observable<ClothingType> {
    return this.http.put<ClothingType>(`${this.apiServerUrl}/clothingType/update`, clothingType);
  }

  public deleteClothingType(clothingTypeId: string): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/clothingType/delete/${clothingTypeId}`);
  }
}
