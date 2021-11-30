import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjustesAplicacion } from 'src/app/configuraciones/ajustes-aplicacion';
import { Empresa } from 'src/app/modelos/empresa.model';
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  rutaPrincipal:string = 'empresa';

  constructor(private httpClient: HttpClient) { }

  public guardarEmpresa(empresa: Empresa): Observable<any>{
    return this.httpClient.post(AjustesAplicacion.APIEndpoint + this.rutaPrincipal, empresa, AjustesAplicacion.Opciones);
  }
  public obtenerListaEmpresas(): Observable<any>{
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + this.rutaPrincipal, AjustesAplicacion.Opciones);
  }
  public editarEmpresa(empresa: Empresa): Observable<any>{
    return this.httpClient.put(AjustesAplicacion.APIEndpoint + this.rutaPrincipal,empresa, AjustesAplicacion.Opciones);
  }
  public eliminarEmpresa(empresa: Empresa): Observable<any>{
    return this.httpClient.delete(AjustesAplicacion.APIEndpoint + this.rutaPrincipal + "/" + empresa._id,  AjustesAplicacion.Opciones);
  }}
