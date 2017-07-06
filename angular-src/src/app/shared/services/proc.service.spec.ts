import { TestBed, inject } from '@angular/core/testing';

import { ProcService } from './proc.service';

describe('ProcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcService]
    });
  });

  it('should be created', inject([ProcService], (service: ProcService) => {
    expect(service).toBeTruthy();
  }));
});
