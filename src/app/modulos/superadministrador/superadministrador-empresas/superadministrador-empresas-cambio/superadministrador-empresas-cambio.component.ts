import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profesor } from 'src/app/modelos/profesor.model';
import { ProfesorService } from 'src/app/servicios/escuela/profesor.service';

@Component({
  selector: 'app-superadministrador-empresas-cambio',
  templateUrl: './superadministrador-empresas-cambio.component.html',
  styleUrls: ['./superadministrador-empresas-cambio.component.scss']
})
export class SuperadministradorEmpresasCambioComponent implements OnInit {

  datosForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<SuperadministradorEmpresasCambioComponent>,
    private _formBuilder: FormBuilder,
    private _serProfesor: ProfesorService,
    @Inject(MAT_DIALOG_DATA) public data: Profesor

  ) {
  }

  ngOnInit(): void {
    this.iniciarFormBuilder();
  }
  iniciarFormBuilder() {
    this.datosForm = this._formBuilder.group({
      nombre: [this.data.nombre, [Validators.required]],
      apellidoPaterno: [this.data.apellidoPaterno, [Validators.required]],
      apellidoMaterno: [this.data.apellidoMaterno, [Validators.required]],
      rfc: [this.data.rfc, [Validators.required]],
    });
  }
  onDismiss(): void {
    this.dialogRef.close(null);
  }
  public agregarEmpresa() {
    try{
      if(this.datosForm.valid){
        let profesor: Profesor = (<Profesor>this.datosForm.value)
        profesor.activo = true;
        this.guardarProfesor(profesor);
      }
    }catch(err){
    }
   
  }
  public guardarProfesor(profesor: Profesor) {
    profesor.activo = this.data.activo;
    profesor._id = this.data._id;
    return new Promise((resolve, reject) => {
      this._serProfesor.editarProfesor(profesor).subscribe(
        (profesor: Profesor) => {
          this.dialogRef.close(null);
          resolve(null);
        }, (err: HttpErrorResponse) => {
          reject();
        }
      )
    })
  }
}
