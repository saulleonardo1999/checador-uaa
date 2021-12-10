import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjustesAplicacion } from 'src/app/configuraciones/ajustes-aplicacion';
import { Empleado } from 'src/app/modelos/empleado.model';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  rutaPrincipal: string = 'empleado';

  constructor(private httpClient: HttpClient) { }

  public guardarEmpleado(empleado: Empleado): Observable<any> {
    return this.httpClient.post(AjustesAplicacion.APIEndpoint + this.rutaPrincipal, empleado, AjustesAplicacion.Opciones);
  }
  public obtenerListaEmpleados(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + this.rutaPrincipal, AjustesAplicacion.Opciones);
  }
  public obtenerListaEmpleadosPorEmpresa(idEmpresa:string): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + this.rutaPrincipal + "/empresa/" + idEmpresa, AjustesAplicacion.Opciones);
  }
  public editarEmpleado(empleado: Empleado): Observable<any> {
    return this.httpClient.put(AjustesAplicacion.APIEndpoint + this.rutaPrincipal, empleado, AjustesAplicacion.Opciones);
  }
  public eliminarEmpleado(empleado: Empleado): Observable<any> {
    return this.httpClient.delete(AjustesAplicacion.APIEndpoint + this.rutaPrincipal + "/" + empleado._id, AjustesAplicacion.Opciones);
  }
}
