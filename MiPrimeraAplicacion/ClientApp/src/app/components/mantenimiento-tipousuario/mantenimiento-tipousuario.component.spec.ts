import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoTipousuarioComponent } from './mantenimiento-tipousuario.component';

describe('MantenimientoTipousuarioComponent', () => {
  let component: MantenimientoTipousuarioComponent;
  let fixture: ComponentFixture<MantenimientoTipousuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoTipousuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoTipousuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
