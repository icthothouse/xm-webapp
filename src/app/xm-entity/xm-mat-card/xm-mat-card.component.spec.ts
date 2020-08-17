import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XmMatCardComponent } from './xm-mat-card.component';

describe('XmMatCardComponent', () => {
  let component: XmMatCardComponent;
  let fixture: ComponentFixture<XmMatCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XmMatCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XmMatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
