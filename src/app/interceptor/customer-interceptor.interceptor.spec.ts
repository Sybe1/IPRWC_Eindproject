import { TestBed } from '@angular/core/testing';

import { CustomerInterceptorInterceptor } from './customer-interceptor.interceptor';

describe('CustomerInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CustomerInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CustomerInterceptorInterceptor = TestBed.inject(CustomerInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
