import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoPersonaComponent } from './mantenimiento-persona.component';

describe('MantenimientoPersonaComponent', () => {
  let component: MantenimientoPersonaComponent;
  let fixture: ComponentFixture<MantenimientoPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
