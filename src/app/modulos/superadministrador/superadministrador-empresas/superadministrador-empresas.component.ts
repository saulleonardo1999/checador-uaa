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
import { EmpresaService } from 'src/app/servicios/empresa/empresa.service';
import { SuperadministradorEmpresasAltaComponent } from './superadministrador-empresas-alta/superadministrador-empresas-alta.component';
import { Empresa } from 'src/app/modelos/empresa.model';
import { SuperadministradorEmpresasUbicacionesComponent } from './superadministrador-empresas-ubicaciones/superadministrador-empresas-ubicaciones.component';
@Component({
  selector: 'app-superadministrador-empresas',
  templateUrl: './superadministrador-empresas.component.html',
  styleUrls: ['./superadministrador-empresas.component.scss']
})

export class SuperadministradorEmpresasComponent implements OnInit {
  empresas: Empresa[];
  nombre: string;
  buscadorForm: FormControl;
  isLoading: boolean = false;
  i: number = 0;
  columnas: string[] = ["No.", 'Nombre', 'Estatus', "Direcciones", "Opciones"];
  dataSource: Empresa[];
  constructor(
    private _serEmpresas: EmpresaService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.empresas = [];
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
  public abrirUbicaciones(empresa: Empresa) {
    const dialog = this.dialog.open(SuperadministradorEmpresasUbicacionesComponent, {
      width: "80%",
      data: empresa.ubicaciones
    }).afterClosed().subscribe(result => {
      this._obtenerEmpresas()
    })
  }
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

    const valoresFiltrados = this.empresas.filter(option => {
      return (option.nombre.toLowerCase().includes(filterValue));
    });
    if (!this.buscadorForm.value) {
      this.dataSource = this.empresas;
    } else {
      this.dataSource = valoresFiltrados;
    }
  }
  public obtenerIndiceTabla(empresa: Empresa): number {
    return this.empresas.indexOf(empresa);
  }
  private _obtenerEmpresas() {
    return new Promise((resolve, reject) => {
      this._serEmpresas.obtenerListaEmpresas().subscribe(
        (empresas: Empresa[]) => {
          this.dataSource = empresas;
          this.empresas = empresas;
          resolve(null);
        }, (err: HttpErrorResponse) => {
          reject();
        }
      )
    })
  }
  public eliminarEmpresa(empresa: Empresa) {
    const index = this.dataSource.indexOf(empresa);
    if (index > -1) {
      this.dataSource.splice(index, 1);
    }
    return new Promise((resolve, reject) => {
      this._serEmpresas.eliminarEmpresa(empresa).subscribe(
        (superadmins: any) => {
          this._obtenerEmpresas();
          resolve(null);
        }, (err: HttpErrorResponse) => {
          reject();
        }
      )
    })
  }
  public reactivarEmpresa(empresa: Empresa) {
    const index = this.dataSource.indexOf(empresa);
    if (index > -1) {
      this.dataSource.splice(index, 1);
    }
    empresa.estatus = true;
    return new Promise((resolve, reject) => {
      this._serEmpresas.editarEmpresa(empresa).subscribe(
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

}
