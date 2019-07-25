import { TestBed, inject } from '@angular/core/testing';

import { BillReceivesService } from './bill-receives.service';

describe('BillReceivesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillReceivesService]
    });
  });

  it('should be created', inject([BillReceivesService], (service: BillReceivesService) => {
    expect(service).toBeTruthy();
  }));
});
