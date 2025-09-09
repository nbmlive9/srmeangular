import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiamondCoinUsersComponent } from './diamond-coin-users.component';

describe('DiamondCoinUsersComponent', () => {
  let component: DiamondCoinUsersComponent;
  let fixture: ComponentFixture<DiamondCoinUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiamondCoinUsersComponent]
    });
    fixture = TestBed.createComponent(DiamondCoinUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
