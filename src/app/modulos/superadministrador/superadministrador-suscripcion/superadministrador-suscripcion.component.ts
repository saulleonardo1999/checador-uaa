import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Materia } from 'src/app/modelos/materia.model';
import { MateriaService } from 'src/app/servicios/escuela/materia.service';
import { SuperadministradorSuscripcionAltaComponent } from './superadministrador-suscripcion-alta/superadministrador-suscripcion-alta.component';
import { SuperadministradorSuscripcionCambioComponent } from './superadministrador-suscripcion-cambio/superadministrador-suscripcion-cambio.component';

@Component({
  selector: 'app-superadministrador-suscripcion',
  templateUrl: './superadministrador-suscripcion.component.html',
  styleUrls: ['./superadministrador-suscripcion.component.scss']
})
export class SuperadministradorSuscripcionComponent implements OnInit {
  materias: Materia[];
  dataForExcel = [];
  nombre: string;
  buscadorForm: FormControl;
  isLoading: boolean = false;
  i: number = 0;
  columnas: string[] = ["No.", 'Nombre', 'Código de Materia', "Escolaridad", 'Estatus', 'Opciones'];
  dataSource: Materia[];
  constructor(
    private _serMaterias: MateriaService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.materias = [];
    this.dataSource = [];
  }

  ngOnInit(): void {
    this._obtenerSuscripciones();
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
  public agregarSuscripcion() {
    const dialog = this.dialog.open(SuperadministradorSuscripcionAltaComponent, {
      width: "80%"
    }).afterClosed().subscribe(result => {
      this._obtenerSuscripciones()
    })
  }
  public modificarSuscripcion(materia:Materia) {
    const dialog = this.dialog.open(SuperadministradorSuscripcionCambioComponent, {
      width: "80%",
      data: materia
    }).afterClosed().subscribe(result => {
      this._obtenerSuscripciones()
    })
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    const valoresFiltrados = this.materias.filter(option => {
      return (
        option.nombre.toLowerCase().includes(filterValue) ||
        option.codigoMateria.toLowerCase().includes(filterValue) ||
        option.escolaridad.toLowerCase().includes(filterValue) 
      );
    });
    if (!this.buscadorForm.value) {
      this.dataSource = this.materias;
    } else {
      this.dataSource = valoresFiltrados;
    }
  }
  public obtenerIndiceTabla(materia: Materia): number {
    return this.materias.indexOf(materia);
  }
  private _obtenerSuscripciones() {
    return new Promise((resolve, reject) => {
      this._serMaterias.obtenerMaterias().subscribe(
        (materias: Materia[]) => {
          this.dataSource = materias;
          this.materias = materias;
          resolve(null);
        }, (err: HttpErrorResponse) => {
          reject();
        }
      )
    })
  }
  public modificarEstadoPagoSuscripcion(materia: Materia) {
    materia.activo = !materia.activo;
    return new Promise((resolve, reject) => {
      this._serMaterias.editarMateria(materia).subscribe(
        (sub: any) => {
          this._obtenerSuscripciones();
          resolve(null);
        }, (err: HttpErrorResponse) => {
          reject();
        }
      )
    })
  } 
  // exportToExcel() {
  //   let arr = [];
  //   this.materias.forEach(sub=>{
  //     let ob = {
  //       Identificador: sub._id,
  //       "Fecha de Inicio" : moment(sub.fechaInicio).format('DD/MM/YYYY'),
  //       "Fecha Final" : moment(sub.fechaFinal).format('DD/MM/YYYY'),
  //       "Tipo de Suscripción" : (sub.tipo ? "Mensual" : "Anual"),
  //       "Estado de Suscripción": (sub.estadoPago ? "Pagado" : "Sin Pagar"),
  //       "Empresa" : sub._idEmpresa.nombre
  //     }
  //     arr.push(ob);
  //   })

  //   arr.forEach((row: any) => {
  //     this.dataForExcel.push(Object.values(row))
  //   })

  //   let reportData = {
  //     title: 'Suscripciones Empresas - 2021',
  //     data: this.dataForExcel,
  //     headers: Object.keys(arr[0])
  //   }

  //   this.ete.exportExcel(reportData);
  // }
}
