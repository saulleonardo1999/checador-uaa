import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjustesAplicacion } from 'src/app/configuraciones/ajustes-aplicacion';

@Injectable({
  providedIn: 'root'
})
export class ColoniaService {
  constructor(private httpClient: HttpClient) { }

  public obtenerColonias(filtro: string, codigoPostal: string): Observable<any> {

    return this.httpClient.get(AjustesAplicacion.APIEndpoint + 'colonia?filtro=' + filtro + '&cp=' + codigoPostal, AjustesAplicacion.Opciones)
  }
}
