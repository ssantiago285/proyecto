import { TestBed } from '@angular/core/testing';

import { interaccionservice } from './interacciones.service';

describe('InteraccionesService', () => {
  let service: interaccionservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(interaccionservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
