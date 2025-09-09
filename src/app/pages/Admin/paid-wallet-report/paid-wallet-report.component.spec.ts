import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidWalletReportComponent } from './paid-wallet-report.component';

describe('PaidWalletReportComponent', () => {
  let component: PaidWalletReportComponent;
  let fixture: ComponentFixture<PaidWalletReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaidWalletReportComponent]
    });
    fixture = TestBed.createComponent(PaidWalletReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
