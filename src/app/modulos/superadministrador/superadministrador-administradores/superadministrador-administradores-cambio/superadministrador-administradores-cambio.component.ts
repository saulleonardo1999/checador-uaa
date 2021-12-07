import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Administrador } from 'src/app/modelos/administrador.model';
import { Empresa } from 'src/app/modelos/empresa.model';
import { AdministradorService } from 'src/app/servicios/administrador/administrador.service';
import { EmpresaService } from 'src/app/servicios/empresa/empresa.service';

@Component({
  selector: 'app-superadministrador-administradores-cambio',
  templateUrl: './superadministrador-administradores-cambio.component.html',
  styleUrls: ['./superadministrador-administradores-cambio.component.scss']
})
export class SuperadministradorAdministradoresCambioComponent implements OnInit {

  datosForm: FormGroup;
  empresas: Empresa[];
  constructor(
    public dialogRef: MatDialogRef<SuperadministradorAdministradoresCambioComponent>,
    private _formBuilder: FormBuilder,
    private _serAdministrador: AdministradorService,
    private _serEmpresa: EmpresaService,
    @Inject(MAT_DIALOG_DATA) public data: Administrador
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
      nombre: [this.data.nombre],
      correo: [this.data.correo],
      _idEmpresa: [''],
      apellidoPaterno: [this.data.apellidoPaterno],
      apellidoMaterno: [this.data.apellidoMaterno],
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
  modificarAdministrador() {
    const newSuperadmin = <Administrador> this.datosForm.value;
    newSuperadmin._id = this.data._id;
    return new Promise((resolve, reject) => {
      this._serAdministrador.editarAdministrador(<Administrador>this.datosForm.value).subscribe(
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
