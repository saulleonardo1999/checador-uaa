import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Empleado } from 'src/app/modelos/empleado.model';
import { EmpleadoService } from 'src/app/servicios/empleado/empleado.service';
import { AdministradorEmpleadosAltaComponent } from './administrador-empleados-alta/administrador-empleados-alta.component';

@Component({
  selector: 'app-administrador-empleados',
  templateUrl: './administrador-empleados.component.html',
  styleUrls: ['./administrador-empleados.component.scss']
})
export class AdministradorEmpleadosComponent implements OnInit {
  empleados: Empleado[];
  nombre: string;
  buscadorForm: FormControl;
  isLoading: boolean = false;
  i: number = 0;
  columnas: string[] = ["No.", 'Nombre', 'Apellido Materno', "Apellido Paterno", 'Correo', 'Empresa', "Opciones"];
  dataSource: Empleado[];
  constructor(
    private _serEmpleados: EmpleadoService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.empleados = [];
    this.dataSource = [];
  }

  ngOnInit(): void {
    this._obtenerEmpleados();
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
  public agregarEmpleado() {
    const dialog = this.dialog.open(AdministradorEmpleadosAltaComponent, {
      width: "80%"
    }).afterClosed().subscribe(result => {
      this._obtenerEmpleados()
    })
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    const valoresFiltrados = this.empleados.filter(option => {
      return (
        option.nombre.toLowerCase().includes(filterValue) ||
        option.apellidoMaterno.toLowerCase().includes(filterValue) ||
        option.apellidoPaterno.toLowerCase().includes(filterValue) ||
        option.correo.toLowerCase().includes(filterValue) ||
        option._idEmpresa.nombre.toLowerCase().includes(filterValue) 
      );
    });
    if (!this.buscadorForm.value) {
      this.dataSource = this.empleados;
    } else {
      this.dataSource = valoresFiltrados;
    }
  }
  public obtenerIndiceTabla(superadmin: Empleado): number {
    return this.empleados.indexOf(superadmin);
  }
  private _obtenerEmpleados() {
    return new Promise((resolve, reject) => {
      this._serEmpleados.obtenerListaEmpleados().subscribe(
        (empleado: Empleado[]) => {
          this.dataSource = empleado;
          this.empleados = empleado;
          resolve(null);
        }, (err: HttpErrorResponse) => {
          reject();
        }
      )
    })
  }
  public activarDesactivarEmpleado(admin: Empleado) {
    admin.estatus = !admin.estatus;
    return new Promise((resolve, reject) => {
      this._serEmpleados.editarEmpleado(admin).subscribe(
        (superadmins: any) => {
          this._obtenerEmpleados();
          resolve(null);
        }, (err: HttpErrorResponse) => {
          console.log(err);
          reject();
        }
      )
    })
  }

}
