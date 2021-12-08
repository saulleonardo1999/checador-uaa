import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoSuscripcion } from 'src/app/globales/tiposSuscripcion.enum';
import { Empresa } from 'src/app/modelos/empresa.model';
import { Suscripcion } from 'src/app/modelos/suscripcion.model';
import { EmpresaService } from 'src/app/servicios/empresa/empresa.service';
import { SuscripcionService } from 'src/app/servicios/suscripcion/suscripcion.service';
import { SuperadministradorSuscripcionAltaComponent } from '../superadministrador-suscripcion-alta/superadministrador-suscripcion-alta.component';

@Component({
  selector: 'app-superadministrador-suscripcion-cambio',
  templateUrl: './superadministrador-suscripcion-cambio.component.html',
  styleUrls: ['./superadministrador-suscripcion-cambio.component.scss']
})
export class SuperadministradorSuscripcionCambioComponent implements OnInit {
  datosForm: FormGroup;
  empresas: Empresa[];
  TipoSuscripcion = TipoSuscripcion;
  constructor(
    public dialogRef: MatDialogRef<SuperadministradorSuscripcionAltaComponent>,
    private _formBuilder: FormBuilder,
    private _servicioSuscripcion: SuscripcionService,
    private _serEmpresa: EmpresaService,
    @Inject(MAT_DIALOG_DATA) public data: Suscripcion
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
      fechaInicio: [this.data.fechaInicio],
      fechaFinal: [this.data.fechaFinal],
      _idEmpresa: [''],
      tipo: [this.data.tipo]
    });
  }

  private _inicializarEmpresa(){
    this.empresas.every(empresa=>{
      if(empresa._id == this.data._idEmpresa._id){
        this.datosForm.get('_idEmpresa').setValue(empresa);
        return false;
      }
      return true;
    })
  }
  editarSuscripcion() {
    return new Promise((resolve, reject) => {
      this._servicioSuscripcion.editarSuscripcion(<Suscripcion>this.datosForm.value).subscribe(
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
          this._inicializarEmpresa();
          resolve(null);
        }, (err: HttpErrorResponse) => {
          reject();
        }
      )
    })
  }
}
