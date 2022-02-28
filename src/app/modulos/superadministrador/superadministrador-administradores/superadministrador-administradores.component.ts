import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { escolaridades } from 'src/app/globales/escolaridades';
import { Alumno } from 'src/app/modelos/alumno.model';
import { AlumnoService } from 'src/app/servicios/escuela/alumno.service';
import { SuperadministradorAdministradoresAltaComponent } from './superadministrador-administradores-alta/superadministrador-administradores-alta.component';
import { SuperadministradorAdministradoresCambioComponent } from './superadministrador-administradores-cambio/superadministrador-administradores-cambio.component';

@Component({
  selector: 'app-superadministrador-administradores',
  templateUrl: './superadministrador-administradores.component.html',
  styleUrls: ['./superadministrador-administradores.component.scss']
})
export class SuperadministradorAdministradoresComponent implements OnInit {
  alumnos: Alumno[];
  nombre: string;
  buscadorForm: FormControl;
  isLoading: boolean = false;
  i: number = 0;
  columnas: string[] = ["No.", 'Nombre', 'Apellido Materno', "Apellido Paterno", 'Escolaridad', 'Fecha de Nacimiento', 'Estatus', "Opciones"];
  dataSource: Alumno[];
  constructor(
    private _serAlumnos: AlumnoService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.alumnos = [];
    this.dataSource = [];
  }

  ngOnInit(): void {
    this._obtenerAlumnos();
    this._iniciarFormBuilder();
    this._iniciarSubscriberFormBuilder();

  }
  private _iniciarFormBuilder() {
    this.buscadorForm = this._formBuilder.control(['']);
  }
  private _iniciarSubscriberFormBuilder() {
    this.buscadorForm.valueChanges.subscribe(value => {
      this._filter(value)
    })
  }
  public agregarAdministrador() {
    const dialog = this.dialog.open(SuperadministradorAdministradoresAltaComponent, {
      width: "80%"
    }).afterClosed().subscribe(result => {
      this._obtenerAlumnos()
    })
  }
  public modificarAdministrador(alumno:Alumno) {
    const dialog = this.dialog.open(SuperadministradorAdministradoresCambioComponent, {
      width: "80%",
      data: alumno
    }).afterClosed().subscribe(result => {
      this._obtenerAlumnos()
    })
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    const valoresFiltrados = this.alumnos.filter(option => {
      return (
        option.nombre.toLowerCase().includes(filterValue) ||
        option.apellidoMaterno.toLowerCase().includes(filterValue) ||
        option.apellidoPaterno.toLowerCase().includes(filterValue) 
      );
    });
    if (!this.buscadorForm.value) {
      this.dataSource = this.alumnos;
    } else {
      this.dataSource = valoresFiltrados;
    }
  }
  public obtenerIndiceTabla(alumno: Alumno): number {
    return this.alumnos.indexOf(alumno);
  }
  private _obtenerAlumnos() {
    return new Promise((resolve, reject) => {
      this._serAlumnos.obtenerAlumnos().subscribe(
        (alumnos: Alumno[]) => {
          console.log(alumnos);
          this.dataSource = alumnos;
          this.alumnos = alumnos;
          resolve(null);
        }, (err: HttpErrorResponse) => {
          reject();
        }
      )
    })
  }
  public activarDesactivarAdministrador(alumno: Alumno) {
    alumno.activo = !alumno.activo;
    return new Promise((resolve, reject) => {
      this._serAlumnos.editarAlumno(alumno).subscribe(
        (superadmins: any) => {
          this._obtenerAlumnos();
          resolve(null);
        }, (err: HttpErrorResponse) => {
          console.log(err);
          reject();
        }
      )
    })
  }
}
