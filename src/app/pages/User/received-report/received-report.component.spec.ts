import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedReportComponent } from './received-report.component';

describe('ReceivedReportComponent', () => {
  let component: ReceivedReportComponent;
  let fixture: ComponentFixture<ReceivedReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceivedReportComponent]
    });
    fixture = TestBed.createComponent(ReceivedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
