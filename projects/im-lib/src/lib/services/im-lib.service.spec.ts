import { TestBed } from '@angular/core/testing';

import { ImLibService } from './im-lib.service';

describe('ImLibService', () => {
  let service: ImLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
