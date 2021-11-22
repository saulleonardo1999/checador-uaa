import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-superadministrador-drawer',
  templateUrl: './superadministrador-drawer.component.html',
  styleUrls: ['./superadministrador-drawer.component.scss']
})
export class SuperadministradorDrawerComponent implements OnInit {
  componenteActual:string= "Superadministrador";
  links = [
    {
      name: "Empresas",
      url: "empresa"
    },
    {
      name: "Suscripción",
      url: "suscripcion"
    },
    {
      name: "Otros",
      url: "otros"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
