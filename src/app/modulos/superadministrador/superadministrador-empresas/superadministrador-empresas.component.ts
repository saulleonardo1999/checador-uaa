import { Component, OnInit, ViewChild } from '@angular/core';
import { CodigoPostalService } from 'src/app/servicios/ubicacion/codigo-postal.service';
import { AgmMap, MapsAPILoader } from "@agm/core";
import { FormBuilder, FormControl } from '@angular/forms';
import { Superadministrador } from 'src/app/modelos/superadministrador.model';
import { SuperadministradorService } from 'src/app/servicios/superadministrador/superadministrador.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SuperadministradorOtrosAltaComponent } from '../superadminsitrador-otros/superadministrador-otros-alta/superadministrador-otros-alta.component';
import { SuperadministradorOtrosCambioComponent } from '../superadminsitrador-otros/superadministrador-otros-cambio/superadministrador-otros-cambio.component';
import { SuperadministradorEmpresasAltaComponent } from './superadministrador-empresas-alta/superadministrador-empresas-alta.component';
import { SuperadministradorEmpresasUbicacionesComponent } from './superadministrador-empresas-ubicaciones/superadministrador-empresas-ubicaciones.component';
import { ExportExcelService } from 'src/app/servicios/excel/export-excel.service';
import * as moment from 'moment';
import { Profesor } from 'src/app/modelos/profesor.model';
import { ProfesorService } from 'src/app/servicios/escuela/profesor.service';
import { SuperadministradorEmpresasCambioComponent } from './superadministrador-empresas-cambio/superadministrador-empresas-cambio.component';
@Component({
  selector: 'app-superadministrador-empresas',
  templateUrl: './superadministrador-empresas.component.html',
  styleUrls: ['./superadministrador-empresas.component.scss']
})

export class SuperadministradorEmpresasComponent implements OnInit {
  profesores: Profesor[];
  nombre: string;
  dataForExcel = [];

  buscadorForm: FormControl;
  isLoading: boolean = false;
  i: number = 0;
  columnas: string[] = ["No.", 'Nombre', 'Apellido Paterno', "Apellido Materno", "rfc", "Estatus", "Opciones"];
  dataSource: Profesor[];
  constructor(
    private _serProfesores: ProfesorService,
    private _formBuilder: FormBuilder,
    public ete: ExportExcelService,
    public dialog: MatDialog
  ) {
    this.profesores = [];
    this.dataSource = [];
  }

  ngOnInit(): void {
    this._obtenerEmpresas();
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
  public agregarEmpresa() {
    const dialog = this.dialog.open(SuperadministradorEmpresasAltaComponent, {
      width: "80%"
    }).afterClosed().subscribe(result => {
      this._obtenerEmpresas()
    })
  }
  public editarEmpresa(data: Profesor) {
    const dialog = this.dialog.open(SuperadministradorEmpresasCambioComponent, {
      width: "80%",
      data: data,
    }).afterClosed().subscribe(result => {
      this._obtenerEmpresas()
    })
  }
  // public abrirUbicaciones(empresa: Profesor) {
  //   const dialog = this.dialog.open(SuperadministradorEmpresasUbicacionesComponent, {
  //     width: "80%",
  //     data: empresa.ubicaciones
  //   }).afterClosed().subscribe(result => {
  //     this._obtenerEmpresas()
  //   })
  // }
  // public modificarSuperAdministrador(admin: Superadministrador) {
  //   const dialog = this.dialog.open(SuperadministradorOtrosCambioComponent, {
  //     width: "80%",
  //     data: admin
  //   }).afterClosed().subscribe(result => {
  //     this._obtenerSuperAdministradores()
  //   })
  // }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    const valoresFiltrados = this.profesores.filter(option => {
      return (option.nombre.toLowerCase().includes(filterValue));
    });
    if (!this.buscadorForm.value) {
      this.dataSource = this.profesores;
    } else {
      this.dataSource = valoresFiltrados;
    }
  }
  public obtenerIndiceTabla(profesor: Profesor): number {
    return this.profesores.indexOf(profesor);
  }
  private _obtenerEmpresas() {
    return new Promise((resolve, reject) => {
      this._serProfesores.obtenerProfesores().subscribe(
        (profesores: Profesor[]) => {
          this.dataSource = profesores;
          this.profesores = profesores;
          resolve(null);
        }, (err: HttpErrorResponse) => {
          reject();
        }
      )
    })
  }
  public eliminarProfesor(profesor: Profesor) {
    const index = this.dataSource.indexOf(profesor);
    // if (index > -1) {
    //   this.dataSource.splice(index, 1);
    // }
    return new Promise((resolve, reject) => {
      this._serProfesores.eliminarProfesor(profesor).subscribe(
        (superadmins: any) => {
          this._obtenerEmpresas();
          resolve(null);
        }, (err: HttpErrorResponse) => {
          reject();
        }
      )
    })
  }
  public reactivarProfesor(profesor: Profesor) {
    const index = this.dataSource.indexOf(profesor);
    // if (index > -1) {
    //   this.dataSource.splice(index, 1);
    // }
    profesor.activo = true;
    return new Promise((resolve, reject) => {
      this._serProfesores.editarProfesor(profesor).subscribe(
        (superadmins: any) => {
          this._obtenerEmpresas();
          resolve(null);
        }, (err: HttpErrorResponse) => {
          reject();
        }
      )
    })
  }
  // private async _obtenerCodigosPostales(codigoPostal:string) {
  //   return new Promise((resolve, reject) => {
  //     this._serCodigoPostal.obtenerCodigoPostal(codigoPostal).subscribe(
  //       (superadmins: CodigoPostal[]) => {
  //         this.dataSource = superadmins;
  //         this.superadministradores = superadmins;
  //         resolve(null);
  //       }, (err: HttpErrorResponse) => {
  //         reject();
  //       }
  //     )
  //   })
  // }
  // exportToExcel() {
  //   let arr = [];
  //   this.profesores.forEach(sub => {
  //     let ob = {
  //       Identificador: sub._id,
  //       "Nombre": sub.nombre,
  //       "Estatus": sub.estatus ? "Activa" : "Inactiva",
  //       "Código Postal": sub.ubicaciones[0]._idCodigoPostal.c_CodigoPostal,
  //       "Calle": sub.ubicaciones[0].calle,
  //       "No. Exterior": sub.ubicaciones[0].numeroExterior,
  //       "No. Interior": sub.ubicaciones[0].numeroInterior ? sub.ubicaciones[0].numeroInterior : ""
  //     }
  //     arr.push(ob);
  //   })

  //   arr.forEach((row: any) => {
  //     this.dataForExcel.push(Object.values(row))
  //   })

  //   let reportData = {
  //     title: `Empresas - ${moment(Date.now()).format("DD/MM/YYYY")}`,
  //     data: this.dataForExcel,
  //     headers: Object.keys(arr[0])
  //   }

  //   this.ete.exportExcel(reportData);
  // }
}
