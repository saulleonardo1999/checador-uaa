import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjustesAplicacion } from 'src/app/configuraciones/ajustes-aplicacion';
import { Materia } from 'src/app/modelos/materia.model';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  ruta: string = "materia";
  constructor(private httpClient: HttpClient) { }

  public guardarMateria(materia: Materia): Observable<any> {
    return this.httpClient.post(AjustesAplicacion.APIEndpoint + this.ruta, materia, AjustesAplicacion.Opciones);
  }
  public obtenerMaterias(): Observable<any> {
    return this.httpClient.get(AjustesAplicacion.APIEndpoint + this.ruta, AjustesAplicacion.Opciones);
  }
  public editarMateria(materia: Materia): Observable<any> {
    return this.httpClient.put(AjustesAplicacion.APIEndpoint + this.ruta, materia, AjustesAplicacion.Opciones);
  }
  public eliminarMateria(materia: Materia): Observable<any> {
    return this.httpClient.delete(AjustesAplicacion.APIEndpoint + this.ruta + "/" + materia._id, AjustesAplicacion.Opciones);
  }
}
