import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOrdersDataComponent } from './pending-orders-data.component';

describe('PendingOrdersDataComponent', () => {
  let component: PendingOrdersDataComponent;
  let fixture: ComponentFixture<PendingOrdersDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingOrdersDataComponent]
    });
    fixture = TestBed.createComponent(PendingOrdersDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
