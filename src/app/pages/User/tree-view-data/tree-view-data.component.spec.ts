import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewDataComponent } from './tree-view-data.component';

describe('TreeViewDataComponent', () => {
  let component: TreeViewDataComponent;
  let fixture: ComponentFixture<TreeViewDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreeViewDataComponent]
    });
    fixture = TestBed.createComponent(TreeViewDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
