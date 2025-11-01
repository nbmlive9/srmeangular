import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldTeamComponent } from './gold-team.component';

describe('GoldTeamComponent', () => {
  let component: GoldTeamComponent;
  let fixture: ComponentFixture<GoldTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoldTeamComponent]
    });
    fixture = TestBed.createComponent(GoldTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
