import { TestBed } from '@angular/core/testing';

import { RegistroService } from '../registro-services/registro-service.service';

describe('RegistroService', () => {
  let service: RegistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
