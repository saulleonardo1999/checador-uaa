import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorEmpleadosAltaComponent } from './administrador-empleados-alta.component';

describe('AdministradorEmpleadosAltaComponent', () => {
  let component: AdministradorEmpleadosAltaComponent;
  let fixture: ComponentFixture<AdministradorEmpleadosAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministradorEmpleadosAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorEmpleadosAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
