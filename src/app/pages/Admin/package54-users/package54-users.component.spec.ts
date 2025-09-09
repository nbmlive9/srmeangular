import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Package54UsersComponent } from './package54-users.component';

describe('Package54UsersComponent', () => {
  let component: Package54UsersComponent;
  let fixture: ComponentFixture<Package54UsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Package54UsersComponent]
    });
    fixture = TestBed.createComponent(Package54UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
