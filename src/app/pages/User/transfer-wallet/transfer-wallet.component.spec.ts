import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferWalletComponent } from './transfer-wallet.component';

describe('TransferWalletComponent', () => {
  let component: TransferWalletComponent;
  let fixture: ComponentFixture<TransferWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransferWalletComponent]
    });
    fixture = TestBed.createComponent(TransferWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
