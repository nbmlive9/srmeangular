import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesReportComponent } from './incomes-report.component';

describe('IncomesReportComponent', () => {
  let component: IncomesReportComponent;
  let fixture: ComponentFixture<IncomesReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomesReportComponent]
    });
    fixture = TestBed.createComponent(IncomesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
