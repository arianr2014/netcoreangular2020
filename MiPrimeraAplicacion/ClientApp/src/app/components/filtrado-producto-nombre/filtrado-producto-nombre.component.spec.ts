import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltradoProductoNombreComponent } from './filtrado-producto-nombre.component';

describe('FiltradoProductoNombreComponent', () => {
  let component: FiltradoProductoNombreComponent;
  let fixture: ComponentFixture<FiltradoProductoNombreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltradoProductoNombreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltradoProductoNombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
