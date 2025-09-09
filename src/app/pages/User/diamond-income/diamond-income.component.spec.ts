import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiamondIncomeComponent } from './diamond-income.component';

describe('DiamondIncomeComponent', () => {
  let component: DiamondIncomeComponent;
  let fixture: ComponentFixture<DiamondIncomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiamondIncomeComponent]
    });
    fixture = TestBed.createComponent(DiamondIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
