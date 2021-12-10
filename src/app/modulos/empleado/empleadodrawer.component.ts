import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empleadodrawer',
  templateUrl: './empleadodrawer.component.html',
  styleUrls: ['./empleadodrawer.component.scss']
})
export class EmpleadodrawerComponent implements OnInit {
  componenteActual:string= "Empleado";
  links = [
    {
      name: "Entradas",
      url: "entradas"
    },
    {
      name: "Salidas",
      url: "salidas"
    },
    {
      name: "Horario Trabajado",
      url: "horario-trabajado"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
