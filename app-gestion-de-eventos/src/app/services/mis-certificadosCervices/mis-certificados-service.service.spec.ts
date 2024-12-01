import { TestBed } from '@angular/core/testing';

import { MisCertificadosServiceService } from './mis-certificados-service.service';

describe('MisCertificadosServiceService', () => {
  let service: MisCertificadosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisCertificadosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
