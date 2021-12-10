import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-administrador-horario',
  templateUrl: './administrador-horario.component.html',
  styleUrls: ['./administrador-horario.component.scss']
})
export class AdministradorHorarioComponent implements OnInit {

  constructor(public dialog: MatDialog) { 

  }

  ngOnInit(): void {
  }

  public agregarHorario() {
    //const dialog = this.dialog.open(AdministradorHorarioAsignarComponent, {
      //width: "80%"
    //})
  }

}
