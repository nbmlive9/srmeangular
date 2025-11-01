import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilverTeamComponent } from './silver-team.component';

describe('SilverTeamComponent', () => {
  let component: SilverTeamComponent;
  let fixture: ComponentFixture<SilverTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SilverTeamComponent]
    });
    fixture = TestBed.createComponent(SilverTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
