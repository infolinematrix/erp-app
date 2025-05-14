/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PickupService } from './pickup.service';

describe('Service: Pickup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PickupService]
    });
  });

  it('should ...', inject([PickupService], (service: PickupService) => {
    expect(service).toBeTruthy();
  }));
});
