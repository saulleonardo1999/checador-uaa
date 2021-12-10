import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoSalidaComponent } from './empleado-salida.component';

describe('EmpleadoSalidaComponent', () => {
  let component: EmpleadoSalidaComponent;
  let fixture: ComponentFixture<EmpleadoSalidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoSalidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
