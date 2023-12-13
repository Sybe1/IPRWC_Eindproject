import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedSuperComponent } from './liked-super.component';

describe('LikedSuperComponent', () => {
  let component: LikedSuperComponent;
  let fixture: ComponentFixture<LikedSuperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LikedSuperComponent]
    });
    fixture = TestBed.createComponent(LikedSuperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
