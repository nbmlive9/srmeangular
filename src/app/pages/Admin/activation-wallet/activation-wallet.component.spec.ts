import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationWalletComponent } from './activation-wallet.component';

describe('ActivationWalletComponent', () => {
  let component: ActivationWalletComponent;
  let fixture: ComponentFixture<ActivationWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivationWalletComponent]
    });
    fixture = TestBed.createComponent(ActivationWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
