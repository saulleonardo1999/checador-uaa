import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion/Autenticacion.service';
import { AutenticacionErrorModalComponent } from '../autenticacion-error-modal/autenticacion-error-modal.component';

@Component({
  selector: 'app-autenticacion-superadministrador',
  templateUrl: './autenticacion-superadministrador.component.html',
  styleUrls: ['./autenticacion-superadministrador.component.scss']
})
export class AutenticacionSuperadministradorComponent implements OnInit {

  autenticacionForm: FormGroup;
  correoValido: boolean = true;
  passwordValida: boolean = true;
  constructor(
    private _autenticacionService: AutenticacionService,
    private _formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) {

  }

  private _inicializarFormBuilder() {
    this.autenticacionForm = this._formBuilder.group({
      correo: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this._inicializarFormBuilder();
  }
  public abrirlModalError() {
    const dialog = this.dialog.open(AutenticacionErrorModalComponent, {
      width: "30%",
    }).afterClosed().subscribe(result => {
      this.autenticacionForm.reset();
    })
  }
  public async _validarCredenciales() {
    try {
      return new Promise((resolve, reject) => {
        let correo: string = String(this.getAutenticacionFormCorreo.value);
        let password: string = String(this.getAutenticacionFormPassword.value);
        this._autenticacionService.iniciarSesionSuperAdministrador(correo, password).subscribe(
          (token: any) => {
            console.log("hola");
            this._credencialesValidas();
            this.router.navigate(['/superadministrador'])
            resolve(null);
          }, (err: HttpErrorResponse) => {
            console.log(err.status);
            switch (err.status) {
              case 422:
              case 404:
              case 403:
                this.abrirlModalError();
                break;
            }
            reject();
          }
        );
      });
    } catch (err) {
      console.log(err);
    }
  }
  private _credencialesValidas() {
    this.correoValido = true;
    this.passwordValida = true;
  }
  get getAutenticacionFormCorreo() {
    return this.autenticacionForm.get('correo')
  }
  get getAutenticacionFormPassword() {
    return this.autenticacionForm.get('password')
  }
}
