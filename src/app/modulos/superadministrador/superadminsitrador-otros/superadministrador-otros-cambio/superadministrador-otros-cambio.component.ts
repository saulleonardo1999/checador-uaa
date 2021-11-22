import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Superadministrador } from 'src/app/modelos/superadministrador.model';
import { SuperadministradorService } from 'src/app/servicios/superadministrador/superadministrador.service';

@Component({
  selector: 'app-superadministrador-otros-cambio',
  templateUrl: './superadministrador-otros-cambio.component.html',
  styleUrls: ['./superadministrador-otros-cambio.component.scss']
})
export class SuperadministradorOtrosCambioComponent implements OnInit {
  datosForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<SuperadministradorOtrosCambioComponent>,
    private _formBuilder: FormBuilder,
    private _serSuperAdministrador: SuperadministradorService,
    @Inject(MAT_DIALOG_DATA) public data: Superadministrador
  ) { }

  ngOnInit(): void {
    this.iniciarFormBuilder();
  }
  onDismiss(): void {
    this.dialogRef.close(null);
  }
  iniciarFormBuilder() {
    this.datosForm = this._formBuilder.group({
      nombre: [this.data.nombre],
      correo: [this.data.correo],
      apellidoPaterno: [this.data.apellidoPaterno],
      apellidoMaterno: [this.data.apellidoMaterno],
    });
  }
  modificarSuperAdministrador() {
    const newSuperadmin = <Superadministrador> this.datosForm.value;
    newSuperadmin._id = this.data._id;
    return new Promise((resolve, reject) => {
      this._serSuperAdministrador.editarSuperAdministrador(<Superadministrador>this.datosForm.value).subscribe(
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
