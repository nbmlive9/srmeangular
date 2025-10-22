import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ETicketsComponent } from './e-tickets.component';

describe('ETicketsComponent', () => {
  let component: ETicketsComponent;
  let fixture: ComponentFixture<ETicketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ETicketsComponent]
    });
    fixture = TestBed.createComponent(ETicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
