import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorHorarioComponent } from './administrador-horario.component';

describe('AdministradorHorarioComponent', () => {
  let component: AdministradorHorarioComponent;
  let fixture: ComponentFixture<AdministradorHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministradorHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
