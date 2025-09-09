import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralClubIncomeComponent } from './referral-club-income.component';

describe('ReferralClubIncomeComponent', () => {
  let component: ReferralClubIncomeComponent;
  let fixture: ComponentFixture<ReferralClubIncomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReferralClubIncomeComponent]
    });
    fixture = TestBed.createComponent(ReferralClubIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
