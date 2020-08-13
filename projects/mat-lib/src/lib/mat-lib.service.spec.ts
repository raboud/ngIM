import { TestBed } from '@angular/core/testing';

import { MatLibService } from './mat-lib.service';

describe('MatLibService', () => {
  let service: MatLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
