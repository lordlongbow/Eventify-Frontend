import { TestBed } from '@angular/core/testing';

import { MisEventosServicesService } from './mis-eventos-services.service';

describe('MisEventosServicesService', () => {
  let service: MisEventosServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisEventosServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
