import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectUserWalletTransferComponent } from './direct-user-wallet-transfer.component';

describe('DirectUserWalletTransferComponent', () => {
  let component: DirectUserWalletTransferComponent;
  let fixture: ComponentFixture<DirectUserWalletTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectUserWalletTransferComponent]
    });
    fixture = TestBed.createComponent(DirectUserWalletTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
