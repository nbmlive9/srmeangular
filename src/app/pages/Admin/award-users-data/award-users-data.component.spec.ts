import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardUsersDataComponent } from './award-users-data.component';

describe('AwardUsersDataComponent', () => {
  let component: AwardUsersDataComponent;
  let fixture: ComponentFixture<AwardUsersDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AwardUsersDataComponent]
    });
    fixture = TestBed.createComponent(AwardUsersDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
