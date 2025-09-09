import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositesComponent } from './deposites.component';

describe('DepositesComponent', () => {
  let component: DepositesComponent;
  let fixture: ComponentFixture<DepositesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositesComponent]
    });
    fixture = TestBed.createComponent(DepositesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
