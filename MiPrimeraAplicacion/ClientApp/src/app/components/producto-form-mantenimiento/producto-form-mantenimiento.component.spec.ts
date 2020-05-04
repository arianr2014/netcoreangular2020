import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoFormMantenimientoComponent } from './producto-form-mantenimiento.component';

describe('ProductoFormMantenimientoComponent', () => {
  let component: ProductoFormMantenimientoComponent;
  let fixture: ComponentFixture<ProductoFormMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoFormMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoFormMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
