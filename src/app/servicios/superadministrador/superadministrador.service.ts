import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjustesAplicacion } from 'src/app/configuraciones/ajustes-aplicacion';
import { Superadministrador } from 'src/app/modelos/superadministrador.model';

@Injectable({
  providedIn: 'root'
})
export class SuperadministradorService {
  ruta:string = "superadministrador";
  constructor(private httpClient: HttpClient) { }

  public guardarSuperAdministrador(superAd: Superadministrador): Observable<any>{
    return this.httpClient.post(AjustesAplicacion.APIEndpoint + this.ruta, superAd, AjustesAplicacion.Opciones);
  }
  public obtenerListaSuperAdministradores(): Observable<any>{
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + this.ruta, AjustesAplicacion.Opciones);
  }
  public editarSuperAdministrador(superAd: Superadministrador): Observable<any>{
    return this.httpClient.put(AjustesAplicacion.APIEndpoint + this.ruta,superAd, AjustesAplicacion.Opciones);
  }
  public eliminarSuperAdministrador(superAd: Superadministrador): Observable<any>{
    return this.httpClient.delete(AjustesAplicacion.APIEndpoint + this.ruta + "/" + superAd._id,  AjustesAplicacion.Opciones);
  }
}
