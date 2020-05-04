import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltradoProductoCategoriaComponent } from './filtrado-producto-categoria.component';

describe('FiltradoProductoCategoriaComponent', () => {
  let component: FiltradoProductoCategoriaComponent;
  let fixture: ComponentFixture<FiltradoProductoCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltradoProductoCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltradoProductoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
