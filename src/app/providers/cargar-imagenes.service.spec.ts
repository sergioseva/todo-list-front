import { TestBed } from '@angular/core/testing';

import { CargarImagenesService } from './cargar-imagenes.service';

describe('CargarImagenesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CargarImagenesService = TestBed.get(CargarImagenesService);
    expect(service).toBeTruthy();
  });
});
