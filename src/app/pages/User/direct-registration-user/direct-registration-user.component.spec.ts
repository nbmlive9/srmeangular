import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectRegistrationUserComponent } from './direct-registration-user.component';

describe('DirectRegistrationUserComponent', () => {
  let component: DirectRegistrationUserComponent;
  let fixture: ComponentFixture<DirectRegistrationUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectRegistrationUserComponent]
    });
    fixture = TestBed.createComponent(DirectRegistrationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
