import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoEncontroInformacionComponent } from './no-encontro-informacion.component';

describe('NoEncontroInformacionComponent', () => {
  let component: NoEncontroInformacionComponent;
  let fixture: ComponentFixture<NoEncontroInformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoEncontroInformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoEncontroInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
