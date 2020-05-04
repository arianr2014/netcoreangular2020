import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPersonaComponent } from './tabla-persona.component';

describe('TablaPersonaComponent', () => {
  let component: TablaPersonaComponent;
  let fixture: ComponentFixture<TablaPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
