import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightTeamComponent } from './right-team.component';

describe('RightTeamComponent', () => {
  let component: RightTeamComponent;
  let fixture: ComponentFixture<RightTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RightTeamComponent]
    });
    fixture = TestBed.createComponent(RightTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
