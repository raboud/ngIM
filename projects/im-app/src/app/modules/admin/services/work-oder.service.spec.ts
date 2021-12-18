import { TestBed } from '@angular/core/testing';

import { WorkOderService } from './work-oder.service';

describe('WorkOderService', () => {
  let service: WorkOderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkOderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
