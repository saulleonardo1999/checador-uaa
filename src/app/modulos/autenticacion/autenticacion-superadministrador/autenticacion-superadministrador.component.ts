import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion/Autenticacion.service';

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
    private router: Router
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

  public async _validarCredenciales() {
    return new Promise((resolve, reject) => {
      let correo: string = String(this.getAutenticacionFormCorreo.value);
      let password: string = String(this.getAutenticacionFormPassword.value);
      this._autenticacionService.iniciarSesionAdministrador(correo, password).subscribe(
        (token: any) => {
          this._credencialesValidas();
          this.router.navigate(['/superadministrador'])
          resolve(null);
        }, (err: HttpErrorResponse) => {
          console.log(err.status);
          switch (err.status) {
            case 422:
              this._credencialesInvalidas();
              break;
            case 403:
              this._passwordInvalido();
              break;
          }
          reject();
        }
      );
    });
  }
  private _passwordInvalido() {
    this.correoValido = true;
    this.passwordValida = false;
  }
  private _credencialesInvalidas() {
    this.correoValido = false;
    this.passwordValida = false;
  }
  private _credencialesValidas() {
    this.correoValido = true;
    this.passwordValida = true;
  }
  private validadorCredenciales() {
    return this.correoValido && this.passwordValida;
  } 
  get getAutenticacionFormCorreo() {
    return this.autenticacionForm.get('correo')
  }

  get getAutenticacionFormPassword() {
    return this.autenticacionForm.get('password')
  }
}
