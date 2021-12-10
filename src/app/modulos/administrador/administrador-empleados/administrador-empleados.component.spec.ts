import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorEmpleadosComponent } from './administrador-empleados.component';

describe('AdministradorEmpleadosComponent', () => {
  let component: AdministradorEmpleadosComponent;
  let fixture: ComponentFixture<AdministradorEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministradorEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
