import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { escolaridades } from 'src/app/globales/escolaridades';
import { Alumno } from 'src/app/modelos/alumno.model';
import { AlumnoService } from 'src/app/servicios/escuela/alumno.service';

@Component({
  selector: 'app-superadministrador-administradores-alta',
  templateUrl: './superadministrador-administradores-alta.component.html',
  styleUrls: ['./superadministrador-administradores-alta.component.scss']
})
export class SuperadministradorAdministradoresAltaComponent implements OnInit {
  datosForm: FormGroup;
  escolaridades:string[] = escolaridades;

  constructor(
    public dialogRef: MatDialogRef<SuperadministradorAdministradoresAltaComponent>,
    private _formBuilder: FormBuilder,
    private _serAlumnos: AlumnoService,
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
      nombre: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      escolaridad: [''],
      fechaNacimiento: [''],
    });
  }
  agregarAlumno() {
    return new Promise((resolve, reject) => {
      this._serAlumnos.guardarAlumno(<Alumno>this.datosForm.value).subscribe(
        (alumno: Alumno) => {
          this.dialogRef.close(null);
          resolve(null);
        }, (err: HttpErrorResponse) => {
          reject();
        }
      )
    })
  }

}
