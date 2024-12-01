import { TestBed } from '@angular/core/testing';

import { NuevoServicesService } from '../../services/nuevo-services/nuevo-services.service';

describe('NuevoServicesService', () => {
  let service: NuevoServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevoServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
