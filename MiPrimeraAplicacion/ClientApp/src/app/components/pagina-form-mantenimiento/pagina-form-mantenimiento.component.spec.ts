import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaFormMantenimientoComponent } from './pagina-form-mantenimiento.component';

describe('PaginaFormMantenimientoComponent', () => {
  let component: PaginaFormMantenimientoComponent;
  let fixture: ComponentFixture<PaginaFormMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaFormMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaFormMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
