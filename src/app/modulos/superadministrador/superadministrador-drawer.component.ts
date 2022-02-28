import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-superadministrador-drawer',
  templateUrl: './superadministrador-drawer.component.html',
  styleUrls: ['./superadministrador-drawer.component.scss']
})
export class SuperadministradorDrawerComponent implements OnInit {
  componenteActual:string= "Administrador del Sistema";
  links = [
    {
      name: "Profesores",
      url: "empresas",
      icon: "supervisor_account"
    },
    {
      name: "Alumnos",
      url: "administradores",
      icon: "escalator_warning"
    },
    {
      name: "Materias",
      url: "suscripcion",
      icon: "border_color"
    },
    {
      name: "Superadministradores",
      url: "otros",
      icon: "groups"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
