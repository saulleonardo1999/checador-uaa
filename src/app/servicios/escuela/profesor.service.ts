import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjustesAplicacion } from 'src/app/configuraciones/ajustes-aplicacion';
import { Profesor } from 'src/app/modelos/profesor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {


  ruta: string = "profesor";
  constructor(private httpClient: HttpClient) { }

  public guardarProfesor(materia: Profesor): Observable<any> {
    return this.httpClient.post(AjustesAplicacion.APIEndpoint + this.ruta, materia, AjustesAplicacion.Opciones);
  }
  public obtenerProfesores(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + this.ruta, AjustesAplicacion.Opciones);
  }
  public editarProfesor(profesor: Profesor): Observable<any> {
    return this.httpClient.put(AjustesAplicacion.APIEndpoint + this.ruta, profesor, AjustesAplicacion.Opciones);
  }
  public eliminarProfesor(profesor: Profesor): Observable<any> {
    profesor.activo = false;  
    return this.httpClient.put(AjustesAplicacion.APIEndpoint + this.ruta, profesor, AjustesAplicacion.Opciones);
  }}
