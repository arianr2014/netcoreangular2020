import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFormMantenimientoComponent } from './usuario-form-mantenimiento.component';

describe('UsuarioFormMantenimientoComponent', () => {
  let component: UsuarioFormMantenimientoComponent;
  let fixture: ComponentFixture<UsuarioFormMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioFormMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioFormMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
