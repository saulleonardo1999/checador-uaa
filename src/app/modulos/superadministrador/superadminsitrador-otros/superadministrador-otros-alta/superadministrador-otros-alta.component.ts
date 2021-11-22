import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuperadministradorService } from 'src/app/servicios/superadministrador/superadministrador.service';
import { Superadministrador } from 'src/app/modelos/superadministrador.model';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-superadministrador-otros-alta',
  templateUrl: './superadministrador-otros-alta.component.html',
  styleUrls: ['./superadministrador-otros-alta.component.scss']
})
export class SuperadministradorOtrosAltaComponent implements OnInit {
  datosForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<SuperadministradorOtrosAltaComponent>,
    private _formBuilder: FormBuilder,
    private _serSuperAdministrador: SuperadministradorService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.iniciarFormBuilder();
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
      password: ['']
    });
  }
  agregarSuperAdministrador() {
    return new Promise((resolve, reject) => {
      this._serSuperAdministrador.guardarSuperAdministrador(<Superadministrador>this.datosForm.value).subscribe(
        (superadmins: Superadministrador) => {
          console.log("SE GUARDO");
          this.dialogRef.close(null);
          resolve(null);
        }, (err: HttpErrorResponse) => {
          console.log("FALLIDO");
          reject();
        }
      )
    })
  }
}
