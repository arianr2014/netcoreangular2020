import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoProductoComponent } from './mantenimiento-producto.component';

describe('MantenimientoProductoComponent', () => {
  let component: MantenimientoProductoComponent;
  let fixture: ComponentFixture<MantenimientoProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
