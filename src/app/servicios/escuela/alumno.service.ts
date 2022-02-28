import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjustesAplicacion } from 'src/app/configuraciones/ajustes-aplicacion';
import { Alumno } from 'src/app/modelos/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  ruta:string = "alumno";
  constructor(private httpClient: HttpClient) { }

  public guardarAlumno(alumno: Alumno): Observable<any>{
    return this.httpClient.post(AjustesAplicacion.APIEndpoint + this.ruta, alumno, AjustesAplicacion.Opciones);
  }
  public obtenerAlumnos(): Observable<any>{
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + this.ruta, AjustesAplicacion.Opciones);
  }
  public editarAlumno(superAd: Alumno): Observable<any>{
    return this.httpClient.put(AjustesAplicacion.APIEndpoint + this.ruta,superAd, AjustesAplicacion.Opciones);
  }
  public eliminarAlumno(superAd: Alumno): Observable<any>{
    return this.httpClient.delete(AjustesAplicacion.APIEndpoint + this.ruta + "/" + superAd._id,  AjustesAplicacion.Opciones);
  }
}
