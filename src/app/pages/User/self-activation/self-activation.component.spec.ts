import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfActivationComponent } from './self-activation.component';

describe('SelfActivationComponent', () => {
  let component: SelfActivationComponent;
  let fixture: ComponentFixture<SelfActivationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelfActivationComponent]
    });
    fixture = TestBed.createComponent(SelfActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
