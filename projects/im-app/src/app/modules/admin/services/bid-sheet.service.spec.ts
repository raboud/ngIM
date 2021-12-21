import { TestBed } from '@angular/core/testing';

import { BidSheetService } from './bid-sheet.service';

describe('BidSheetService', () => {
  let service: BidSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BidSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
