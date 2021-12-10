import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoEntradaComponent } from './empleado-entrada.component';

describe('EmpleadoEntradaComponent', () => {
  let component: EmpleadoEntradaComponent;
  let fixture: ComponentFixture<EmpleadoEntradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoEntradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
