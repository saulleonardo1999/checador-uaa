import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { escolaridades } from 'src/app/globales/escolaridades';
import { TipoSuscripcion } from 'src/app/globales/tiposSuscripcion.enum';
import { Empresa } from 'src/app/modelos/empresa.model';
import { Materia } from 'src/app/modelos/materia.model';
import { Suscripcion } from 'src/app/modelos/suscripcion.model';
import { EmpresaService } from 'src/app/servicios/empresa/empresa.service';
import { MateriaService } from 'src/app/servicios/escuela/materia.service';
import { SuscripcionService } from 'src/app/servicios/suscripcion/suscripcion.service';
import { SuperadministradorSuscripcionAltaComponent } from '../superadministrador-suscripcion-alta/superadministrador-suscripcion-alta.component';

@Component({
  selector: 'app-superadministrador-suscripcion-cambio',
  templateUrl: './superadministrador-suscripcion-cambio.component.html',
  styleUrls: ['./superadministrador-suscripcion-cambio.component.scss']
})
export class SuperadministradorSuscripcionCambioComponent implements OnInit {
  escolaridades = escolaridades;

  datosForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SuperadministradorSuscripcionCambioComponent>,
    private _formBuilder: FormBuilder,
    private _serMaterias: MateriaService,
    @Inject(MAT_DIALOG_DATA) public data: Materia
  ) {
   }

  ngOnInit(): void {
    this.iniciarFormBuilder();
  }
  onDismiss(): void {
    this.dialogRef.close(null);
  }
  iniciarFormBuilder() {
    this.datosForm = this._formBuilder.group({
      nombre: [this.data.nombre],
      codigoMateria: [this.data.codigoMateria],
      escolaridad: [this.data.escolaridad],
    });
  }

  editarSuscripcion() {
    let sub: Materia = <Materia>this.datosForm.value;
    sub.activo = true;
    sub._id = this.data._id;
    return new Promise((resolve, reject) => {
      this._serMaterias.editarMateria(sub).subscribe(
        (sub: Suscripcion) => {
          this.dialogRef.close(null);
          resolve(null);
        }, (err: HttpErrorResponse) => {
          reject();
        }
      )
    })
  }
}
