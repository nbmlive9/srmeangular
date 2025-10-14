import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyIncomeReportComponent } from './my-income-report.component';

describe('MyIncomeReportComponent', () => {
  let component: MyIncomeReportComponent;
  let fixture: ComponentFixture<MyIncomeReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyIncomeReportComponent]
    });
    fixture = TestBed.createComponent(MyIncomeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
