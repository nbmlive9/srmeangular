import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Package45UsersComponent } from './package45-users.component';

describe('Package45UsersComponent', () => {
  let component: Package45UsersComponent;
  let fixture: ComponentFixture<Package45UsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Package45UsersComponent]
    });
    fixture = TestBed.createComponent(Package45UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
