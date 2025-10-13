import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftTeamComponent } from './left-team.component';

describe('LeftTeamComponent', () => {
  let component: LeftTeamComponent;
  let fixture: ComponentFixture<LeftTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeftTeamComponent]
    });
    fixture = TestBed.createComponent(LeftTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
