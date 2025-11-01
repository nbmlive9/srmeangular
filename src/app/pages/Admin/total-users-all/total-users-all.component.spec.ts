import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalUsersAllComponent } from './total-users-all.component';

describe('TotalUsersAllComponent', () => {
  let component: TotalUsersAllComponent;
  let fixture: ComponentFixture<TotalUsersAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalUsersAllComponent]
    });
    fixture = TestBed.createComponent(TotalUsersAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
