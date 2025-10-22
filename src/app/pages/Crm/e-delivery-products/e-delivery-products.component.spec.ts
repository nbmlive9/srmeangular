import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EDeliveryProductsComponent } from './e-delivery-products.component';

describe('EDeliveryProductsComponent', () => {
  let component: EDeliveryProductsComponent;
  let fixture: ComponentFixture<EDeliveryProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EDeliveryProductsComponent]
    });
    fixture = TestBed.createComponent(EDeliveryProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
