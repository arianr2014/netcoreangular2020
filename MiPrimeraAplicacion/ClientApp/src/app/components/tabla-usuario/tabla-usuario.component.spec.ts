import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaUsuarioComponent } from './tabla-usuario.component';

describe('TablaUsuarioComponent', () => {
  let component: TablaUsuarioComponent;
  let fixture: ComponentFixture<TablaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
