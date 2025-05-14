import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacySettingsComponent } from './pharmacy-settings.component';

describe('PharmacySettingsComponent', () => {
  let component: PharmacySettingsComponent;
  let fixture: ComponentFixture<PharmacySettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacySettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
