import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DowanloadTreeDataComponent } from './dowanload-tree-data.component';

describe('DowanloadTreeDataComponent', () => {
  let component: DowanloadTreeDataComponent;
  let fixture: ComponentFixture<DowanloadTreeDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DowanloadTreeDataComponent]
    });
    fixture = TestBed.createComponent(DowanloadTreeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
