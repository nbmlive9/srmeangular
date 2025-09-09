import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayUsersComponent } from './today-users.component';

describe('TodayUsersComponent', () => {
  let component: TodayUsersComponent;
  let fixture: ComponentFixture<TodayUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodayUsersComponent]
    });
    fixture = TestBed.createComponent(TodayUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
