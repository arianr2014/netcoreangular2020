import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorProductoCategoriaComponent } from './buscador-producto-categoria.component';

describe('BuscadorProductoCategoriaComponent', () => {
  let component: BuscadorProductoCategoriaComponent;
  let fixture: ComponentFixture<BuscadorProductoCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorProductoCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorProductoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
