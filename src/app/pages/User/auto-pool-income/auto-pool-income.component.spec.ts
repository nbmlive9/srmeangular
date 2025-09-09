import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoPoolIncomeComponent } from './auto-pool-income.component';

describe('AutoPoolIncomeComponent', () => {
  let component: AutoPoolIncomeComponent;
  let fixture: ComponentFixture<AutoPoolIncomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoPoolIncomeComponent]
    });
    fixture = TestBed.createComponent(AutoPoolIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
