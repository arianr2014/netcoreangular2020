import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaFormMantenimientoComponent } from './persona-form-mantenimiento.component';

describe('PersonaFormMantenimientoComponent', () => {
  let component: PersonaFormMantenimientoComponent;
  let fixture: ComponentFixture<PersonaFormMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaFormMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaFormMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
