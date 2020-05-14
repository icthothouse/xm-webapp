import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitySpecManagementComponent } from './entity-spec-management.component';

describe('TenantSpecMngComponent', () => {
  let component: EntitySpecManagementComponent;
  let fixture: ComponentFixture<EntitySpecManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitySpecManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitySpecManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
