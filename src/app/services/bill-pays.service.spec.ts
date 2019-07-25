import { TestBed, inject } from '@angular/core/testing';

import { BillPaysService } from './bill-pays.service';

describe('BillPaysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillPaysService]
    });
  });

  it('should be created', inject([BillPaysService], (service: BillPaysService) => {
    expect(service).toBeTruthy();
  }));
});
