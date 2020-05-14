import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteBienvenidaComponent } from './componente-bienvenida.component';

describe('ComponenteBienvenidaComponent', () => {
  let component: ComponenteBienvenidaComponent;
  let fixture: ComponentFixture<ComponenteBienvenidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteBienvenidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteBienvenidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
