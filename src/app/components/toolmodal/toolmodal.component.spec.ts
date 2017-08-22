import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolmodalComponent } from './toolmodal.component';

describe('ToolmodalComponent', () => {
  let component: ToolmodalComponent;
  let fixture: ComponentFixture<ToolmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
