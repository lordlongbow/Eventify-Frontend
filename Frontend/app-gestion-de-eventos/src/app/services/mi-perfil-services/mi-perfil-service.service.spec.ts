import { TestBed } from '@angular/core/testing';

import { MiPerfilServiceService } from './mi-perfil-service.service';

describe('MiPerfilServiceService', () => {
  let service: MiPerfilServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiPerfilServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
