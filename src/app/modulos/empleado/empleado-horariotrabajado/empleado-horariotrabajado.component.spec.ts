import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoHorariotrabajadoComponent } from './empleado-horariotrabajado.component';

describe('EmpleadoHorariotrabajadoComponent', () => {
  let component: EmpleadoHorariotrabajadoComponent;
  let fixture: ComponentFixture<EmpleadoHorariotrabajadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoHorariotrabajadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoHorariotrabajadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
