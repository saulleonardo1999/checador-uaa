import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AjustesAplicacion } from '../../configuraciones/ajustes-aplicacion';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private httpClient: HttpClient) { }
  public iniciarSesionSuperAdministrador(correo:string, password:string): Observable<any> {
    const credenciales = {
      correo: correo,
      password: password
    }
    try{
      return this.httpClient.post(AjustesAplicacion.APIEndpoint + 'autenticacion/superadministrador', credenciales, AjustesAplicacion.Opciones).pipe(
        map((result: any) => {
          if(result)
            this.guardarToken(result["token"])
        })
      );
    }catch(err){}
  }
  public iniciarSesionAdministrador(correo:string, password:string): Observable<any> {
    const credenciales = {
      correo: correo,
      password: password
    }
    return this.httpClient.post(AjustesAplicacion.APIEndpoint + 'autenticacion/administrador', credenciales, AjustesAplicacion.Opciones).pipe(
      map((result: any) => {
        if(result)
          this.guardarToken(result["token"])
      })
    );
  }
  public iniciarSesionEmpleado(correo:string, password:string): Observable<any> {
    const credenciales = {
      correo: correo,
      password: password
    }
    return this.httpClient.post(AjustesAplicacion.APIEndpoint + 'autenticacion/empleado', credenciales, AjustesAplicacion.Opciones).pipe(
      map((result: any) => {
        if(result)
          this.guardarToken(result["token"])
      })
    );
  }
  private guardarToken(token: string): string {
    localStorage.setItem('token_autenticacion', token);
    return token;
  }

}
