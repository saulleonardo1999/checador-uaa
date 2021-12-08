import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjustesAplicacion } from 'src/app/configuraciones/ajustes-aplicacion';
import { Suscripcion } from 'src/app/modelos/suscripcion.model';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {
  ruta: string = "suscripcion";
  constructor(private httpClient: HttpClient) { }

  public guardarSuscripcion(sub: Suscripcion): Observable<any> {
    return this.httpClient.post(AjustesAplicacion.APIEndpoint + this.ruta, sub, AjustesAplicacion.Opciones);
  }
  public obtenerListaSuscripciones(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + this.ruta, AjustesAplicacion.Opciones);
  }
  public obtenerListaSuscripcionesPorEmpresa(idEmpresa: string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + this.ruta + "/empresa/" + idEmpresa, AjustesAplicacion.Opciones);
  }
  public editarSuscripcion(sub: Suscripcion): Observable<any> {
    return this.httpClient.put(AjustesAplicacion.APIEndpoint + this.ruta, sub, AjustesAplicacion.Opciones);
  }
}
