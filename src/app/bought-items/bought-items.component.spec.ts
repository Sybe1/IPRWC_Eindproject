import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoughtItemsComponent } from './bought-items.component';

describe('BoughtItemsComponent', () => {
  let component: BoughtItemsComponent;
  let fixture: ComponentFixture<BoughtItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoughtItemsComponent]
    });
    fixture = TestBed.createComponent(BoughtItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
