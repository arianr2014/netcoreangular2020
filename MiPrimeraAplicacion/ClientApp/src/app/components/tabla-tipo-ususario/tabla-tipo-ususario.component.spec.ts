import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTipoUsusarioComponent } from './tabla-tipo-ususario.component';

describe('TablaTipoUsusarioComponent', () => {
  let component: TablaTipoUsusarioComponent;
  let fixture: ComponentFixture<TablaTipoUsusarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaTipoUsusarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTipoUsusarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
