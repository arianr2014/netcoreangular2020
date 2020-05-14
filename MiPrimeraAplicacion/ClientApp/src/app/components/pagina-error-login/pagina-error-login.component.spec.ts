import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaErrorLoginComponent } from './pagina-error-login.component';

describe('PaginaErrorLoginComponent', () => {
  let component: PaginaErrorLoginComponent;
  let fixture: ComponentFixture<PaginaErrorLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaErrorLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaErrorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
