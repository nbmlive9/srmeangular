import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletReportComponent } from './wallet-report.component';

describe('WalletReportComponent', () => {
  let component: WalletReportComponent;
  let fixture: ComponentFixture<WalletReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalletReportComponent]
    });
    fixture = TestBed.createComponent(WalletReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
