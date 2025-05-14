/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HoumanResourceService } from './houman-resource.service';

describe('Service: HoumanResource', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HoumanResourceService]
    });
  });

  it('should ...', inject([HoumanResourceService], (service: HoumanResourceService) => {
    expect(service).toBeTruthy();
  }));
});
