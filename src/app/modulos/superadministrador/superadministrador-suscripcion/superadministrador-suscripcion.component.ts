import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Suscripcion } from 'src/app/modelos/suscripcion.model';
import { ExportExcelService } from 'src/app/servicios/excel/export-excel.service';
import { SuscripcionService } from 'src/app/servicios/suscripcion/suscripcion.service';
import { SuperadministradorSuscripcionAltaComponent } from './superadministrador-suscripcion-alta/superadministrador-suscripcion-alta.component';
import { SuperadministradorSuscripcionCambioComponent } from './superadministrador-suscripcion-cambio/superadministrador-suscripcion-cambio.component';
import { SuperadministradorSuscripcionGraficaComponent } from './superadministrador-suscripcion-grafica/superadministrador-suscripcion-grafica.component';

@Component({
  selector: 'app-superadministrador-suscripcion',
  templateUrl: './superadministrador-suscripcion.component.html',
  styleUrls: ['./superadministrador-suscripcion.component.scss']
})
export class SuperadministradorSuscripcionComponent implements OnInit {
  suscripciones: Suscripcion[];
  dataForExcel = [];
  nombre: string;
  buscadorForm: FormControl;
  isLoading: boolean = false;
  i: number = 0;
  columnas: string[] = ["No.", 'Fecha de Inicio', 'Fecha Final', "Estado de Pago", 'Tipo', 'Empresa', 'Opciones'];
  dataSource: Suscripcion[];
  constructor(
    private _servicioSuscripcion: SuscripcionService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    public ete: ExportExcelService
  ) {
    this.suscripciones = [];
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
  public verGrafica() {
    const dialog = this.dialog.open(SuperadministradorSuscripcionGraficaComponent, {
      width: "80%"
    }).afterClosed().subscribe(result => {
    })
  }
  public modificarSuscripcion(sub:Suscripcion) {
    const dialog = this.dialog.open(SuperadministradorSuscripcionCambioComponent, {
      width: "80%",
      data: sub
    }).afterClosed().subscribe(result => {
      this._obtenerSuscripciones()
    })
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    const valoresFiltrados = this.suscripciones.filter(option => {
      return (
        option._idEmpresa.nombre.toLowerCase().includes(filterValue)
      );
    });
    if (!this.buscadorForm.value) {
      this.dataSource = this.suscripciones;
    } else {
      this.dataSource = valoresFiltrados;
    }
  }
  public obtenerIndiceTabla(sub: Suscripcion): number {
    return this.suscripciones.indexOf(sub);
  }
  private _obtenerSuscripciones() {
    return new Promise((resolve, reject) => {
      this._servicioSuscripcion.obtenerListaSuscripciones().subscribe(
        (subs: Suscripcion[]) => {
          this.dataSource = subs;
          this.suscripciones = subs;
          resolve(null);
        }, (err: HttpErrorResponse) => {
          reject();
        }
      )
    })
  }
  public modificarEstadoPagoSuscripcion(sub: Suscripcion) {
    sub.estadoPago = !sub.estadoPago;
    return new Promise((resolve, reject) => {
      this._servicioSuscripcion.editarSuscripcion(sub).subscribe(
        (sub: any) => {
          this._obtenerSuscripciones();
          resolve(null);
        }, (err: HttpErrorResponse) => {
          reject();
        }
      )
    })
  } 
  exportToExcel() {
    let arr = [];
    this.suscripciones.forEach(sub=>{
      let ob = {
        Identificador: sub._id,
        "Fecha de Inicio" : moment(sub.fechaInicio).format('DD/MM/YYYY'),
        "Fecha Final" : moment(sub.fechaFinal).format('DD/MM/YYYY'),
        "Tipo de Suscripción" : (sub.tipo ? "Mensual" : "Anual"),
        "Estado de Suscripción": (sub.estadoPago ? "Pagado" : "Sin Pagar"),
        "Empresa" : sub._idEmpresa.nombre
      }
      arr.push(ob);
    })

    arr.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row))
    })

    let reportData = {
      title: 'Suscripciones Empresas - 2021',
      data: this.dataForExcel,
      headers: Object.keys(arr[0])
    }

    this.ete.exportExcel(reportData);
  }
}
