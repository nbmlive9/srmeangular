import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilverUsersDateComponent } from './silver-users-date.component';

describe('SilverUsersDateComponent', () => {
  let component: SilverUsersDateComponent;
  let fixture: ComponentFixture<SilverUsersDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SilverUsersDateComponent]
    });
    fixture = TestBed.createComponent(SilverUsersDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
