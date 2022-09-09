import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPaginaComponent } from './tabla-pagina.component';

describe('TablaPaginaComponent', () => {
  let component: TablaPaginaComponent;
  let fixture: ComponentFixture<TablaPaginaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaPaginaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
