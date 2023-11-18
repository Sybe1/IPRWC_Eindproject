import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpUpdateProductComponent } from './pop-up-update-product.component';

describe('PopUpUpdateProductComponent', () => {
  let component: PopUpUpdateProductComponent;
  let fixture: ComponentFixture<PopUpUpdateProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopUpUpdateProductComponent]
    });
    fixture = TestBed.createComponent(PopUpUpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
