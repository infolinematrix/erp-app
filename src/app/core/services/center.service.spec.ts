/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CenterService } from './center.service';

describe('Service: Center', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CenterService]
    });
  });

  it('should ...', inject([CenterService], (service: CenterService) => {
    expect(service).toBeTruthy();
  }));
});
