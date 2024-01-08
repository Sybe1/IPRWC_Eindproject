import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerInterceptorInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isAuthenticationRequest: boolean = request.url.endsWith('/auth/authenticate');
    const isRegister: boolean = request.url.endsWith('/auth/register');
    const getProduct: boolean = request.url.endsWith('/product/all');
    const getAllClothingTypes: boolean = request.url.endsWith('/clothingType/all');
    const getAllTargetAudiences: boolean = request.url.endsWith('/targetAudience/all');
    const getAllUsers: boolean = request.url.endsWith('/user/all');
    const getProductById: boolean = request.url.startsWith('http://localhost:8080/product/find');
    const getProductsByIdOnline: boolean = request.url.startsWith('https://websiteiprwc.site:8080//product/find');

    if (!isAuthenticationRequest && !getProduct && !getProductById && !isRegister && !getAllUsers && !getAllClothingTypes && !getAllTargetAudiences && !getProductsByIdOnline) {
      const token: string = localStorage.getItem('loginToken') ?? '';
      const newCloneRequest: HttpRequest<any> = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(newCloneRequest);
    }
    return next.handle(request);
  }
}
