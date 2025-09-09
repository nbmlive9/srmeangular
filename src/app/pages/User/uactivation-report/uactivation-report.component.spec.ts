import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UactivationReportComponent } from './uactivation-report.component';

describe('UactivationReportComponent', () => {
  let component: UactivationReportComponent;
  let fixture: ComponentFixture<UactivationReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UactivationReportComponent]
    });
    fixture = TestBed.createComponent(UactivationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
