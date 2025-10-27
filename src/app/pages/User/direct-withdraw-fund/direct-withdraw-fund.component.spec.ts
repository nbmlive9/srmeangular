import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectWithdrawFundComponent } from './direct-withdraw-fund.component';

describe('DirectWithdrawFundComponent', () => {
  let component: DirectWithdrawFundComponent;
  let fixture: ComponentFixture<DirectWithdrawFundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectWithdrawFundComponent]
    });
    fixture = TestBed.createComponent(DirectWithdrawFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
