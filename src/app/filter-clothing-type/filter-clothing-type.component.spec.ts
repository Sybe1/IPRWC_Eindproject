import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterClothingTypeComponent } from './filter-clothing-type.component';

describe('FilterClothingTypeComponent', () => {
  let component: FilterClothingTypeComponent;
  let fixture: ComponentFixture<FilterClothingTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterClothingTypeComponent]
    });
    fixture = TestBed.createComponent(FilterClothingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
