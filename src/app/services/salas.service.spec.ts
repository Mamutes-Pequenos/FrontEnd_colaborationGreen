import { TestBed } from '@angular/core/testing';

import { SalasService } from './salas.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('SalasService', () => {
  let service: SalasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SalasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
