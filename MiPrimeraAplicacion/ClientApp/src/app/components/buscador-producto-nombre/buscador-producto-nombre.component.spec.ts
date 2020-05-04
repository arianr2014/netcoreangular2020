import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorProductoNombreComponent } from './buscador-producto-nombre.component';

describe('BuscadorProductoNombreComponent', () => {
  let component: BuscadorProductoNombreComponent;
  let fixture: ComponentFixture<BuscadorProductoNombreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorProductoNombreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorProductoNombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
