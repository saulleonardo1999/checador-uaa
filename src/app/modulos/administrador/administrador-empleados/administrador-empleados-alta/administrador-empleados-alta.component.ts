import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empleado } from 'src/app/modelos/empleado.model';
import { Empresa } from 'src/app/modelos/empresa.model';
import { EmpleadoService } from 'src/app/servicios/empleado/empleado.service';
import { EmpresaService } from 'src/app/servicios/empresa/empresa.service';


@Component({
  selector: 'app-administrador-empleados-alta',
  templateUrl: './administrador-empleados-alta.component.html',
  styleUrls: ['./administrador-empleados-alta.component.scss']
})
export class AdministradorEmpleadosAltaComponent implements OnInit {

  datosForm: FormGroup;
  empresas: Empresa[];
  constructor(
    public dialogRef: MatDialogRef<AdministradorEmpleadosAltaComponent>,
    private _formBuilder: FormBuilder,
    private _serEmpleado: EmpleadoService,
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
  agregarEmpleado() {
    return new Promise((resolve, reject) => {
      this._serEmpleado.guardarEmpleado(<Empleado>this.datosForm.value).subscribe(
        (superadmins: Empleado) => {
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
