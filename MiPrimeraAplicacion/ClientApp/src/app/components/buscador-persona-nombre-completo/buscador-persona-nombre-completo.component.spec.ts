import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorPersonaNombreCompletoComponent } from './buscador-persona-nombre-completo.component';

describe('BuscadorPersonaNombreCompletoComponent', () => {
  let component: BuscadorPersonaNombreCompletoComponent;
  let fixture: ComponentFixture<BuscadorPersonaNombreCompletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorPersonaNombreCompletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorPersonaNombreCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
