import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldIncomeComponent } from './gold-income.component';

describe('GoldIncomeComponent', () => {
  let component: GoldIncomeComponent;
  let fixture: ComponentFixture<GoldIncomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoldIncomeComponent]
    });
    fixture = TestBed.createComponent(GoldIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
