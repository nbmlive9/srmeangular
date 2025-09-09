import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilverIncomeComponent } from './silver-income.component';

describe('SilverIncomeComponent', () => {
  let component: SilverIncomeComponent;
  let fixture: ComponentFixture<SilverIncomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SilverIncomeComponent]
    });
    fixture = TestBed.createComponent(SilverIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
