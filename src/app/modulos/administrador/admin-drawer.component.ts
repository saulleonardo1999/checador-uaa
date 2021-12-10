import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-drawer',
  templateUrl: './admin-drawer.component.html',
  styleUrls: ['./admin-drawer.component.scss']
})
export class AdminDrawerComponent implements OnInit {
  componenteActual:string= "Administrador";
  links = [
    {
      name: "Empleados",
      url: "empresas"
    },
    {
      name: "Horario",
      url: "horario"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
