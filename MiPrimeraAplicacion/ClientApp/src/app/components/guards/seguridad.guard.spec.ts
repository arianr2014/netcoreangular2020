import { TestBed, async, inject } from '@angular/core/testing';

import { SeguridadGuard } from './seguridad.guard';

describe('SeguridadGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeguridadGuard]
    });
  });

  it('should ...', inject([SeguridadGuard], (guard: SeguridadGuard) => {
    expect(guard).toBeTruthy();
  }));
});
