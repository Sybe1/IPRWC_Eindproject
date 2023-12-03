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
    const getLatestProduct = request.url.endsWith('/product/findHighestId');

    if (!isAuthenticationRequest && !getProduct && !getLatestProduct && !isRegister) {
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
