import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empresa, Ubicacion } from 'src/app/modelos/empresa.model';

@Component({
  selector: 'app-superadministrador-empresas-ubicaciones',
  templateUrl: './superadministrador-empresas-ubicaciones.component.html',
  styleUrls: ['./superadministrador-empresas-ubicaciones.component.scss']
})
export class SuperadministradorEmpresasUbicacionesComponent implements OnInit {
  datosForm: FormGroup;
  lat:number;
  lng:number;
  zoom:number = 18;
  columnas: string[] = ["No.", 'Codigo Postal', 'Calle', "Colonia", "Número Exterior", "Opciones"];
  dataSource: Ubicacion[];
  constructor(
    public dialogRef: MatDialogRef<SuperadministradorEmpresasUbicacionesComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Ubicacion[]
  ) { 
    this.dataSource = this.data;
  }

  ngOnInit(): void {
    this.iniciarFormBuilder();
  }
  iniciarFormBuilder() {
    this.datosForm = this._formBuilder.group({
      codigoPostal: [{ value: this.data[0]._idCodigoPostal.c_CodigoPostal, disabled: true },],
      calle: [{ value: this.data[0].calle, disabled: true },],
      colonia: [{ value: this.data[0]._idColonia.nombre, disabled: true },],
      numeroExterior: [{ value: this.data[0].numeroExterior, disabled: true },],
      numeroInterior: [{ value: this.data[0].numeroInterior ? this.data[0].numeroInterior:'', disabled: true }]
    });
    this.lat = Number(this.data[0].latitud);
    this.lng = Number(this.data[0].longitud);
  }
  onDismiss(): void {
    this.dialogRef.close(null);
  }
  public obtenerIndiceTabla(ubicacion: Ubicacion): number {
    return this.data.indexOf(ubicacion);
  }
  public cambiarUbicacion(ubicacion: Ubicacion){
    this.setCalle = ubicacion.calle;
    this.setCodigoPostal = ubicacion._idCodigoPostal.c_CodigoPostal;
    this.setColonia = ubicacion._idColonia.nombre;
    this.setNumeroExterior = ubicacion.numeroExterior;
    ubicacion.numeroInterior 
      ? this.setNumeroInterior = ubicacion.numeroInterior
      : null;
    this.lat = Number(ubicacion.latitud);
    this.lng = Number(ubicacion.longitud);

  }
  get getCodigoPostal() {
    return this.datosForm.get('codigoPostal');
  }
  get getCalle() {
    return this.datosForm.get('calle');
  }
  get getColonia() {
    return this.datosForm.get('colonia');
  }
  get getNumeroExterior() {
    return this.datosForm.get('numeroExterior');
  }
  get getNumeroInterior() {
    return this.datosForm.get('numeroInterior');
  }
  set setCodigoPostal(val:any) {
    this.datosForm.get('codigoPostal').setValue(val);
  }
  set setCalle(val:any) {
    this.datosForm.get('calle').setValue(val);
  }
  set setColonia(val:any) {
    this.datosForm.get('colonia').setValue(val);
  }
  set setNumeroExterior(val:any) {
    this.datosForm.get('numeroExterior').setValue(val);
  }
  set setNumeroInterior(val:any) {
    this.datosForm.get('numeroInterior').setValue(val);
  }
}
