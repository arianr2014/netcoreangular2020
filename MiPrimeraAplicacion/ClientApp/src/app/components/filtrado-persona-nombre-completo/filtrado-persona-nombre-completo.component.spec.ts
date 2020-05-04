import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltradoPersonaNombreCompletoComponent } from './filtrado-persona-nombre-completo.component';

describe('FiltradoPersonaNombreCompletoComponent', () => {
  let component: FiltradoPersonaNombreCompletoComponent;
  let fixture: ComponentFixture<FiltradoPersonaNombreCompletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltradoPersonaNombreCompletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltradoPersonaNombreCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
