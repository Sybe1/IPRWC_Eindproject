import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTargetAudienceComponent } from './filter-target-audience.component';

describe('FilterTargetAudienceComponent', () => {
  let component: FilterTargetAudienceComponent;
  let fixture: ComponentFixture<FilterTargetAudienceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterTargetAudienceComponent]
    });
    fixture = TestBed.createComponent(FilterTargetAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
