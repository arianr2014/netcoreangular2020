import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoUsuarioFormMantenimientoComponent } from './tipo-usuario-form-mantenimiento.component';

describe('TipoUsuarioFormMantenimientoComponent', () => {
  let component: TipoUsuarioFormMantenimientoComponent;
  let fixture: ComponentFixture<TipoUsuarioFormMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoUsuarioFormMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoUsuarioFormMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
