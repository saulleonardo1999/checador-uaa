import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Administrador } from 'src/app/modelos/administrador.model';
import { AdministradorService } from 'src/app/servicios/administrador/administrador.service';
import { SuperadministradorAdministradoresAltaComponent } from './superadministrador-administradores-alta/superadministrador-administradores-alta.component';
import { SuperadministradorAdministradoresCambioComponent } from './superadministrador-administradores-cambio/superadministrador-administradores-cambio.component';

@Component({
  selector: 'app-superadministrador-administradores',
  templateUrl: './superadministrador-administradores.component.html',
  styleUrls: ['./superadministrador-administradores.component.scss']
})
export class SuperadministradorAdministradoresComponent implements OnInit {
  administradores: Administrador[];
  nombre: string;
  buscadorForm: FormControl;
  isLoading: boolean = false;
  i: number = 0;
  columnas: string[] = ["No.", 'Nombre', 'Apellido Materno', "Apellido Paterno", 'Correo', 'Empresa', "Opciones"];
  dataSource: Administrador[];
  constructor(
    private _serAdministradores: AdministradorService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.administradores = [];
    this.dataSource = [];
  }

  ngOnInit(): void {
    this._obtenerAdministradores();
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
      this._obtenerAdministradores()
    })
  }
  public modificarAdministrador(admin:Administrador) {
    const dialog = this.dialog.open(SuperadministradorAdministradoresCambioComponent, {
      width: "80%",
      data: admin
    }).afterClosed().subscribe(result => {
      this._obtenerAdministradores()
    })
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    const valoresFiltrados = this.administradores.filter(option => {
      return (
        option.nombre.toLowerCase().includes(filterValue) ||
        option.apellidoMaterno.toLowerCase().includes(filterValue) ||
        option.apellidoPaterno.toLowerCase().includes(filterValue) ||
        option.correo.toLowerCase().includes(filterValue) ||
        option._idEmpresa.nombre.toLowerCase().includes(filterValue) 
      );
    });
    if (!this.buscadorForm.value) {
      this.dataSource = this.administradores;
    } else {
      this.dataSource = valoresFiltrados;
    }
  }
  public obtenerIndiceTabla(superadmin: Administrador): number {
    return this.administradores.indexOf(superadmin);
  }
  private _obtenerAdministradores() {
    return new Promise((resolve, reject) => {
      this._serAdministradores.obtenerListaAdministradores().subscribe(
        (admins: Administrador[]) => {
          console.log(admins);
          this.dataSource = admins;
          this.administradores = admins;
          resolve(null);
        }, (err: HttpErrorResponse) => {
          reject();
        }
      )
    })
  }
  public activarDesactivarAdministrador(admin: Administrador) {
    admin.estatus = !admin.estatus;
    return new Promise((resolve, reject) => {
      this._serAdministradores.editarAdministrador(admin).subscribe(
        (superadmins: any) => {
          this._obtenerAdministradores();
          resolve(null);
        }, (err: HttpErrorResponse) => {
          console.log(err);
          reject();
        }
      )
    })
  }
}
