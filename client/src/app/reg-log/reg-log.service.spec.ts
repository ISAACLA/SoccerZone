import { TestBed, inject } from '@angular/core/testing';

import { RegLogService } from './reg-log.service';

describe('RegLogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegLogService]
    });
  });

  it('should be created', inject([RegLogService], (service: RegLogService) => {
    expect(service).toBeTruthy();
  }));
});
