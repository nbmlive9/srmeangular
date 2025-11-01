import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatinumTeamComponent } from './platinum-team.component';

describe('PlatinumTeamComponent', () => {
  let component: PlatinumTeamComponent;
  let fixture: ComponentFixture<PlatinumTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlatinumTeamComponent]
    });
    fixture = TestBed.createComponent(PlatinumTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
