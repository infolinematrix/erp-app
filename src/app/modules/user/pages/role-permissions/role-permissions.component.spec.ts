import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePermissionsComponent } from './role-permissions.component';

describe('RolePermissionsComponent', () => {
  let component: RolePermissionsComponent;
  let fixture: ComponentFixture<RolePermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolePermissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolePermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
