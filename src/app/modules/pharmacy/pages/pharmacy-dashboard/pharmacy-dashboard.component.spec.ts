import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyDashboardComponent } from './pharmacy-dashboard.component';

describe('PharmacyDashboardComponent', () => {
  let component: PharmacyDashboardComponent;
  let fixture: ComponentFixture<PharmacyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacyDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
