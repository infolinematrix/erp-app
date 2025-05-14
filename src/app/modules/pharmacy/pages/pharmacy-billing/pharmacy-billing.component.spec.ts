import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyBillingComponent } from './pharmacy-billing.component';

describe('PharmacyBillingComponent', () => {
  let component: PharmacyBillingComponent;
  let fixture: ComponentFixture<PharmacyBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacyBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
