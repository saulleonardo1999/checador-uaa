import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloModalComponent } from './titulo-modal.component';

describe('TituloModalComponent', () => {
  let component: TituloModalComponent;
  let fixture: ComponentFixture<TituloModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TituloModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TituloModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
