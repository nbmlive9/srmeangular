import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiamondTeamComponent } from './diamond-team.component';

describe('DiamondTeamComponent', () => {
  let component: DiamondTeamComponent;
  let fixture: ComponentFixture<DiamondTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiamondTeamComponent]
    });
    fixture = TestBed.createComponent(DiamondTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
