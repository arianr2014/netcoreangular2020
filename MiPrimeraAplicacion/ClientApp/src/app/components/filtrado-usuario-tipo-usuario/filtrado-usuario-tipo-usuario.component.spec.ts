import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltradoUsuarioTipoUsuarioComponent } from './filtrado-usuario-tipo-usuario.component';

describe('FiltradoUsuarioTipoUsuarioComponent', () => {
  let component: FiltradoUsuarioTipoUsuarioComponent;
  let fixture: ComponentFixture<FiltradoUsuarioTipoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltradoUsuarioTipoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltradoUsuarioTipoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
