/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RubroBancoService } from './rubro-banco.service';

describe('RubroBancoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RubroBancoService]
    });
  });

  it('should ...', inject([RubroBancoService], (service: RubroBancoService) => {
    expect(service).toBeTruthy();
  }));
});
