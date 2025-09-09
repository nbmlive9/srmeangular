import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivationComponent } from './user-activation.component';

describe('UserActivationComponent', () => {
  let component: UserActivationComponent;
  let fixture: ComponentFixture<UserActivationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserActivationComponent]
    });
    fixture = TestBed.createComponent(UserActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
