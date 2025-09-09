import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorRegistrationComponent } from './sponsor-registration.component';

describe('SponsorRegistrationComponent', () => {
  let component: SponsorRegistrationComponent;
  let fixture: ComponentFixture<SponsorRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SponsorRegistrationComponent]
    });
    fixture = TestBed.createComponent(SponsorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
