import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjustesAplicacion } from 'src/app/configuraciones/ajustes-aplicacion';

@Injectable({
  providedIn: 'root'
})
export class CodigoPostalService {

  constructor(private httpClient: HttpClient) { }

  public obtenerCodigoPostal(codigoPostal: string): Observable<any> {

    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'codigo-postal/' + codigoPostal, AjustesAplicacion.Opciones)
  }
}
