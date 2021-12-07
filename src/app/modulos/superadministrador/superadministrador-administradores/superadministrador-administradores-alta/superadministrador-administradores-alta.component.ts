import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Administrador } from 'src/app/modelos/administrador.model';
import { Empresa } from 'src/app/modelos/empresa.model';
import { AdministradorService } from 'src/app/servicios/administrador/administrador.service';
import { EmpresaService } from 'src/app/servicios/empresa/empresa.service';

@Component({
  selector: 'app-superadministrador-administradores-alta',
  templateUrl: './superadministrador-administradores-alta.component.html',
  styleUrls: ['./superadministrador-administradores-alta.component.scss']
})
export class SuperadministradorAdministradoresAltaComponent implements OnInit {
  datosForm: FormGroup;
  empresas: Empresa[];
  constructor(
    public dialogRef: MatDialogRef<SuperadministradorAdministradoresAltaComponent>,
    private _formBuilder: FormBuilder,
    private _serAdministrador: AdministradorService,
    private _serEmpresa: EmpresaService,
  ) {
    this.empresas = [];
   }

  ngOnInit(): void {
    this.iniciarFormBuilder();
    this.obtenerEmpresas();
  }
  onDismiss(): void {
    this.dialogRef.close(null);
  }
  iniciarFormBuilder() {
    this.datosForm = this._formBuilder.group({
      nombre: [''],
      correo: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      _idEmpresa: [''],
      password: ['']
    });
  }
  agregarAdministrador() {
    return new Promise((resolve, reject) => {
      this._serAdministrador.guardarAdministrador(<Administrador>this.datosForm.value).subscribe(
        (superadmins: Administrador) => {
          this.dialogRef.close(null);
          resolve(null);
        }, (err: HttpErrorResponse) => {
          reject();
        }
      )
    })
  }
  obtenerEmpresas() {
    return new Promise((resolve, reject) => {
      this._serEmpresa.obtenerListaEmpresas().subscribe(
        (empresas: Empresa[]) => {
          this.empresas = empresas;
          resolve(null);
        }, (err: HttpErrorResponse) => {
          reject();
        }
      )
    })
  }

}
