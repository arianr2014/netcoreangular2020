import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorUsuarioTipoUsuarioComponent } from './buscador-usuario-tipo-usuario.component';

describe('BuscadorUsuarioTipoUsuarioComponent', () => {
  let component: BuscadorUsuarioTipoUsuarioComponent;
  let fixture: ComponentFixture<BuscadorUsuarioTipoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorUsuarioTipoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorUsuarioTipoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
