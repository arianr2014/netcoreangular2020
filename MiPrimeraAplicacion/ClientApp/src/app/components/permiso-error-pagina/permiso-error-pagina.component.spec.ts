import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisoErrorPaginaComponent } from './permiso-error-pagina.component';

describe('PermisoErrorPaginaComponent', () => {
  let component: PermisoErrorPaginaComponent;
  let fixture: ComponentFixture<PermisoErrorPaginaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermisoErrorPaginaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisoErrorPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
