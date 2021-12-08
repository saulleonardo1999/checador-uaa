import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TipoSuscripcion } from 'src/app/globales/tiposSuscripcion.enum';
import { Empresa } from 'src/app/modelos/empresa.model';
import { Suscripcion } from 'src/app/modelos/suscripcion.model';
import { EmpresaService } from 'src/app/servicios/empresa/empresa.service';
import { SuscripcionService } from 'src/app/servicios/suscripcion/suscripcion.service';

@Component({
  selector: 'app-superadministrador-suscripcion-alta',
  templateUrl: './superadministrador-suscripcion-alta.component.html',
  styleUrls: ['./superadministrador-suscripcion-alta.component.scss']
})
export class SuperadministradorSuscripcionAltaComponent implements OnInit {
  datosForm: FormGroup;
  empresas: Empresa[];
  TipoSuscripcion = TipoSuscripcion;
  constructor(
    public dialogRef: MatDialogRef<SuperadministradorSuscripcionAltaComponent>,
    private _formBuilder: FormBuilder,
    private _servicioSuscripcion: SuscripcionService,
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
      fechaInicio: [''],
      fechaFinal: [''],
      _idEmpresa: [''],
      tipo: ['']
    });
  }
  agregarSuscripcion() {
    let sub: Suscripcion = <Suscripcion>this.datosForm.value;
    sub.estadoPago = true;
    return new Promise((resolve, reject) => {
      this._servicioSuscripcion.guardarSuscripcion(sub).subscribe(
        (sub: Suscripcion) => {
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
