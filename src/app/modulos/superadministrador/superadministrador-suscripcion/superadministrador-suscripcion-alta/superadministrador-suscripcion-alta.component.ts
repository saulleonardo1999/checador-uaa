import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { escolaridades } from 'src/app/globales/escolaridades';
import { Materia } from 'src/app/modelos/materia.model';
import { MateriaService } from 'src/app/servicios/escuela/materia.service';

@Component({
  selector: 'app-superadministrador-suscripcion-alta',
  templateUrl: './superadministrador-suscripcion-alta.component.html',
  styleUrls: ['./superadministrador-suscripcion-alta.component.scss']
})
export class SuperadministradorSuscripcionAltaComponent implements OnInit {
  escolaridades = escolaridades;
  datosForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<SuperadministradorSuscripcionAltaComponent>,
    private _formBuilder: FormBuilder,
    private _serMaterias: MateriaService,
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
      codigoMateria: [''],
      escolaridad: [''],
    });
  }
  agregarSuscripcion() {
    let sub: Materia = <Materia>this.datosForm.value;
    sub.activo = true;
    return new Promise((resolve, reject) => {
      this._serMaterias.guardarMateria(sub).subscribe(
        (materia: Materia) => {
          this.dialogRef.close(null);
          resolve(null);
        }, (err: HttpErrorResponse) => {
          reject();
        }
      )
    })
  }
  // obtenerEmpresas() {
  //   return new Promise((resolve, reject) => {
  //     this._serEmpresa.obtenerListaEmpresas().subscribe(
  //       (empresas: Empresa[]) => {
  //         this.empresas = empresas;
  //         resolve(null);
  //       }, (err: HttpErrorResponse) => {
  //         reject();
  //       }
  //     )
  //   })
  // }
}
