import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { escolaridades } from 'src/app/globales/escolaridades';
import { Alumno } from 'src/app/modelos/alumno.model';
import { AlumnoService } from 'src/app/servicios/escuela/alumno.service';
@Component({
  selector: 'app-superadministrador-administradores-cambio',
  templateUrl: './superadministrador-administradores-cambio.component.html',
  styleUrls: ['./superadministrador-administradores-cambio.component.scss']
})
export class SuperadministradorAdministradoresCambioComponent implements OnInit {
  escolaridades = escolaridades;
  datosForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<SuperadministradorAdministradoresCambioComponent>,
    private _formBuilder: FormBuilder,
    private _serAlumno: AlumnoService,
    @Inject(MAT_DIALOG_DATA) public data: Alumno
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
      apellidoPaterno: [this.data.apellidoPaterno],
      apellidoMaterno: [this.data.apellidoMaterno],
      escolaridad: [this.data.escolaridad],
      fechaNacimiento: [this.data.fechaNacimiento],
    });
  }
  modificarAlumno() {
    const nuevoAlumno = <Alumno> this.datosForm.value;
    nuevoAlumno._id = this.data._id;
    nuevoAlumno.activo = this.data.activo;
    return new Promise((resolve, reject) => {
      this._serAlumno.editarAlumno(<Alumno>this.datosForm.value).subscribe(
        (superadmins: any) => {
          this.dialogRef.close(null);
          resolve(null);
        }, (err: HttpErrorResponse) => {
          console.log(err);
          reject();
        }
      )
    })
  }

}
