import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrownTeamComponent } from './crown-team.component';

describe('CrownTeamComponent', () => {
  let component: CrownTeamComponent;
  let fixture: ComponentFixture<CrownTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrownTeamComponent]
    });
    fixture = TestBed.createComponent(CrownTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
