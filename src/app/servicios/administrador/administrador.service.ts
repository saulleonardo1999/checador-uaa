import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjustesAplicacion } from 'src/app/configuraciones/ajustes-aplicacion';
import { Administrador } from 'src/app/modelos/administrador.model';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  rutaPrincipal: string = 'administrador';

  constructor(private httpClient: HttpClient) { }

  public guardarAdministrador(administrador: Administrador): Observable<any> {
    return this.httpClient.post(AjustesAplicacion.APIEndpoint + this.rutaPrincipal, administrador, AjustesAplicacion.Opciones);
  }
  public obtenerListaAdministradores(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + this.rutaPrincipal, AjustesAplicacion.Opciones);
  }
  public obtenerListaAdministradoresPorEmpresa(idEmpresa:string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + this.rutaPrincipal + "/empresa/" + idEmpresa, AjustesAplicacion.Opciones);
  }
  public editarAdministrador(administrador: Administrador): Observable<any> {
    return this.httpClient.put(AjustesAplicacion.APIEndpoint + this.rutaPrincipal, administrador, AjustesAplicacion.Opciones);
  }
  public eliminarAdministrador(administrador: Administrador): Observable<any> {
    return this.httpClient.delete(AjustesAplicacion.APIEndpoint + this.rutaPrincipal + "/" + administrador._id, AjustesAplicacion.Opciones);
  }
}
