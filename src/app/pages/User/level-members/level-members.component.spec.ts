import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelMembersComponent } from './level-members.component';

describe('LevelMembersComponent', () => {
  let component: LevelMembersComponent;
  let fixture: ComponentFixture<LevelMembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LevelMembersComponent]
    });
    fixture = TestBed.createComponent(LevelMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
