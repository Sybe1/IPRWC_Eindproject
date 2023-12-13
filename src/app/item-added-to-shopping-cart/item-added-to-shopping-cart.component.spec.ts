import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAddedToShoppingCartComponent } from './item-added-to-shopping-cart.component';

describe('ItemAddedToShoppingCartComponent', () => {
  let component: ItemAddedToShoppingCartComponent;
  let fixture: ComponentFixture<ItemAddedToShoppingCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemAddedToShoppingCartComponent]
    });
    fixture = TestBed.createComponent(ItemAddedToShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
