import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isAuthenticationRequest = request.url.endsWith('/auth/authenticate');
    const isRegister = request.url.endsWith('/auth/register');
    const getProduct = request.url.endsWith('/product/all');
    const getAllClothingTypes = request.url.endsWith('/clothingType/all');
    const getAllTargetAudiences = request.url.endsWith('/targetAudience/all');
    const getAllUsers = request.url.endsWith('/user/all');
    const getProductById = request.url.startsWith('http://localhost:8080/product/find');

    if (!isAuthenticationRequest && !getProduct && !getProductById && !isRegister && !getAllUsers && !getAllClothingTypes && !getAllTargetAudiences) {
      const token = localStorage.getItem('loginToken');
      const newCloneRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(newCloneRequest);
    }

    return next.handle(request);
  }
}
