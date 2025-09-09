import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilverCoinUsersComponent } from './silver-coin-users.component';

describe('SilverCoinUsersComponent', () => {
  let component: SilverCoinUsersComponent;
  let fixture: ComponentFixture<SilverCoinUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SilverCoinUsersComponent]
    });
    fixture = TestBed.createComponent(SilverCoinUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
