import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Package306UsersComponent } from './package306-users.component';

describe('Package306UsersComponent', () => {
  let component: Package306UsersComponent;
  let fixture: ComponentFixture<Package306UsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Package306UsersComponent]
    });
    fixture = TestBed.createComponent(Package306UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
