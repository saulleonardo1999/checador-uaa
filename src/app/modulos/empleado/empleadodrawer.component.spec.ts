import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadodrawerComponent } from './empleadodrawer.component';

describe('EmpleadodrawerComponent', () => {
  let component: EmpleadodrawerComponent;
  let fixture: ComponentFixture<EmpleadodrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadodrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadodrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
