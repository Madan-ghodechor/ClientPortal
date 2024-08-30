import { TestBed } from '@angular/core/testing';

import { TimelogicService } from './timelogic.service';

describe('TimelogicService', () => {
  let service: TimelogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
