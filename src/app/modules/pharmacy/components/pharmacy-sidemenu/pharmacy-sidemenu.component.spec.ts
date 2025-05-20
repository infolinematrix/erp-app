import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacySidemenuComponent } from './pharmacy-sidemenu.component';

describe('PharmacySidemenuComponent', () => {
  let component: PharmacySidemenuComponent;
  let fixture: ComponentFixture<PharmacySidemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacySidemenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacySidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
