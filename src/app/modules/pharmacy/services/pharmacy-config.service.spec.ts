/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PharmacyConfigService } from './pharmacy-config.service';

describe('Service: PharmacyConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PharmacyConfigService]
    });
  });

  it('should ...', inject([PharmacyConfigService], (service: PharmacyConfigService) => {
    expect(service).toBeTruthy();
  }));
});
