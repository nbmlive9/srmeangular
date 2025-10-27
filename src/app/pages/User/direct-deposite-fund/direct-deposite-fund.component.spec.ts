import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectDepositeFundComponent } from './direct-deposite-fund.component';

describe('DirectDepositeFundComponent', () => {
  let component: DirectDepositeFundComponent;
  let fixture: ComponentFixture<DirectDepositeFundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectDepositeFundComponent]
    });
    fixture = TestBed.createComponent(DirectDepositeFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
