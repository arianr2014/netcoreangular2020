import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoPaginaComponent } from './mantenimiento-pagina.component';

describe('MantenimientoPaginaComponent', () => {
  let component: MantenimientoPaginaComponent;
  let fixture: ComponentFixture<MantenimientoPaginaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoPaginaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
