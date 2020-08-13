import { TestBed } from '@angular/core/testing';

import { MsalLibService } from './msal-lib.service';

describe('MsalLibService', () => {
  let service: MsalLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsalLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
