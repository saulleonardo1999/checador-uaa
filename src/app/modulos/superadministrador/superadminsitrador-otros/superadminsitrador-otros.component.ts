import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { pipe } from 'rxjs';
import { debounceTime, map, startWith, switchMap, tap } from 'rxjs/operators';
import { Superadministrador } from 'src/app/modelos/superadministrador.model';
import { SuperadministradorService } from 'src/app/servicios/superadministrador/superadministrador.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuperadministradorOtrosAltaComponent } from './superadministrador-otros-alta/superadministrador-otros-alta.component';
import { SuperadministradorOtrosCambioComponent } from './superadministrador-otros-cambio/superadministrador-otros-cambio.component';
@Component({
  selector: 'app-superadminsitrador-otros',
  templateUrl: './superadminsitrador-otros.component.html',
  styleUrls: ['./superadminsitrador-otros.component.scss']
})
export class SuperadminsitradorOtrosComponent implements OnInit {
  superadministradores: Superadministrador[];
  nombre: string;
  buscadorForm: FormControl;
  isLoading: boolean = false;
  i: number = 0;
  columnas: string[] = ["No.", 'Nombre', 'Apellido Materno', "Apellido Paterno", 'Correo', "Opciones"];
  dataSource: Superadministrador[];
  constructor(
    private _serSuperadministradores: SuperadministradorService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.superadministradores = [];
    this.dataSource = [];
  }

  ngOnInit(): void {
    this._obtenerSuperAdministradores();
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
  public agregarSuperAdministrador() {
    const dialog = this.dialog.open(SuperadministradorOtrosAltaComponent, {
      width: "80%"
    }).afterClosed().subscribe(result => {
      this._obtenerSuperAdministradores()
    })
  }
  public modificarSuperAdministrador(admin:Superadministrador) {
    const dialog = this.dialog.open(SuperadministradorOtrosCambioComponent, {
      width: "80%",
      data: admin
    }).afterClosed().subscribe(result => {
      this._obtenerSuperAdministradores()
    })
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    const valoresFiltrados = this.superadministradores.filter(option => {
      return (
        option.nombre.toLowerCase().includes(filterValue) ||
        option.apellidoMaterno.toLowerCase().includes(filterValue) ||
        option.apellidoPaterno.toLowerCase().includes(filterValue) ||
        option.correo.toLowerCase().includes(filterValue)
      );
    });
    if (!this.buscadorForm.value) {
      this.dataSource = this.superadministradores;
    } else {
      this.dataSource = valoresFiltrados;
    }
  }
  public obtenerIndiceTabla(superadmin: Superadministrador): number {
    return this.superadministradores.indexOf(superadmin);
  }
  private _obtenerSuperAdministradores() {
    return new Promise((resolve, reject) => {
      this._serSuperadministradores.obtenerListaSuperAdministradores().subscribe(
        (superadmins: Superadministrador[]) => {
          this.dataSource = superadmins;
          this.superadministradores = superadmins;
          resolve(null);
        }, (err: HttpErrorResponse) => {
          reject();
        }
      )
    })
  }
  public eliminarSuperAdministradores(superadmin: Superadministrador) {
    const index = this.dataSource.indexOf(superadmin);
    if (index > -1) {
      this.dataSource.splice(index, 1);
    }
    return new Promise((resolve, reject) => {
      this._serSuperadministradores.eliminarSuperAdministrador(superadmin).subscribe(
        (superadmins: any) => {
          this._obtenerSuperAdministradores();
          console.log("Hola");
          console.log(superadmins)
          resolve(null);
        }, (err: HttpErrorResponse) => {
          console.log(err);
          reject();
        }
      )
    })
  }
}
