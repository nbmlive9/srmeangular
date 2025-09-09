import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldCoinUsersComponent } from './gold-coin-users.component';

describe('GoldCoinUsersComponent', () => {
  let component: GoldCoinUsersComponent;
  let fixture: ComponentFixture<GoldCoinUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoldCoinUsersComponent]
    });
    fixture = TestBed.createComponent(GoldCoinUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
