import { AgmMap, MapsAPILoader } from '@agm/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { Empresa, Ubicacion } from 'src/app/modelos/empresa.model';
import { CodigoPostal } from 'src/app/modelos/ubicacion/codigoPostal.model';
import { Colonia } from 'src/app/modelos/ubicacion/colonia.model';
import { EmpresaService } from 'src/app/servicios/empresa/empresa.service';
import { CodigoPostalService } from 'src/app/servicios/ubicacion/codigo-postal.service';
import { ColoniaService } from 'src/app/servicios/ubicacion/colonia.service';
@Component({
  selector: 'app-superadministrador-empresas-alta',
  templateUrl: './superadministrador-empresas-alta.component.html',
  styleUrls: ['./superadministrador-empresas-alta.component.scss']
})
export class SuperadministradorEmpresasAltaComponent implements OnInit {
  @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;
  lat = 19.290950;
  lng = -99.653015;
  zoom = 5;
  getAddress: any;
  currentLocation: any = "";
  datosForm: FormGroup;
  coloniaSubscriber: Subscription;
  cargando: boolean = false;
  colonias: Colonia[];
  codigoPostal: CodigoPostal;
  constructor(
    public dialogRef: MatDialogRef<SuperadministradorEmpresasAltaComponent>,
    private _formBuilder: FormBuilder,
    private apiLoader: MapsAPILoader,
    private _serEmpresa: EmpresaService,
    private _serCodigoPostal: CodigoPostalService,
    private _serColonia: ColoniaService,

  ) {
    this.colonias = [];
  }

  ngOnInit(): void {
    this.iniciarMapa()
    this.agmMap.triggerResize(true);
    this.zoom = 16;
    this.iniciarFormBuilder();
    this.iniciarSubscriberColonia();
    this.iniciarSubscriberCodigoPostal();
  }
  iniciarFormBuilder() {
    this.datosForm = this._formBuilder.group({
      nombre: ['', [Validators.required]],
      codigoPostal: ['', [this.validadorCodigoPostal()]],
      calle: ['', [Validators.required]],
      colonia: [{ value: '', disabled: true }, [this.validadorDeTipoObjeto()]],
      numeroExterior: ['', [Validators.required]],
      numeroInterior: ['']
    });
  }
  iniciarSubscriberColonia() {
    this.coloniaSubscriber = this.getColonia
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.cargando = true),
        switchMap(value => this._serColonia.obtenerColonias(value, this.getCodigoPostal.value)
          .pipe(
            finalize(() => this.cargando = false),
          )
        )
      )
      .subscribe(coloniasFiltradas => this.colonias = coloniasFiltradas);
  }
  iniciarSubscriberCodigoPostal() {
    this.getCodigoPostal.valueChanges.subscribe(value => {
      setTimeout(() => {
        if (this.getCodigoPostal.valid) {
          this.buscarCodigoPostal(this.getCodigoPostal.value);
        }else{
          this.getColonia.disable();
          this.getColonia.reset();
        }

      })
    })

  }
  async buscarCodigoPostal(codigoPostal: string): Promise<CodigoPostal> {
    return new Promise((resolve, reject) => {
      this._serCodigoPostal.obtenerCodigoPostal(codigoPostal).subscribe(
        (codigoPostal: CodigoPostal) => {
          if(codigoPostal){
            this.codigoPostal = codigoPostal;
            this.getColonia.enable();
            resolve(codigoPostal);
          }else{
            reject();
          }
        }, (err: HttpErrorResponse) => {
          reject();
        }
      );
    });
  }
  validadorCodigoPostal() {
    return (control: AbstractControl): Observable<ValidationErrors> | null | { [key: string]: boolean } => {

      const value: string = control.value;
      if (value.length == 5) {
        this._serCodigoPostal.obtenerCodigoPostal(value).subscribe(
          (codigoPostal: CodigoPostal) => {
            return codigoPostal ? null : { 'codigoPostalInexistente': true };
          }, (err: HttpErrorResponse) => {
            return { 'codigoPostalInexistente': true };
          })
      } else {
        return { 'validadorCaracteresMinimos': true }
      }

    }
  }
  validadorDeTipoObjeto() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (typeof control.value === 'object') {
        return null;
      }
      return { 'validadorDeTipoObjeto': true }
    };
  }
  mapClicked($event: any) {

    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;

    this.apiLoader.load().then(() => {
      let geocoder = new google.maps.Geocoder;
      let latlng = { lat: this.lat, lng: this.lng };

      geocoder.geocode({ 'location': latlng }, (results) => {
        console.log(results);
        if (results[0]?.formatted_address) {
          this.currentLocation = results[0].formatted_address;
          console.log(this.currentLocation);
        } else {
          //no se halló
        }
      });
    });
  }
  iniciarMapa() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.getAddress = (this.lat, this.lng)

          this.apiLoader.load().then(() => {
            let geocoder = new google.maps.Geocoder;
            let latlng = { lat: this.lat, lng: this.lng };

            geocoder.geocode({ 'location': latlng }, (results) => {
              console.log(results);
              if (results[0]) {
                this.currentLocation = results[0].formatted_address;
              } else {
                console.log('Not found');
              }
            });
          });

        }
      })
    }

  }
  onDismiss(): void {
    this.dialogRef.close(null);
  }
  public agregarEmpresa() {
    try{
      console.log("No entré")
      if(this.datosForm.valid){
        let empresa: Empresa = new Empresa();
        empresa.nombre = this.getNombre.value;
        let ubicacion: Ubicacion = new Ubicacion();
        ubicacion._idCodigoPostal = this.codigoPostal;
        ubicacion._idColonia = this.getColonia.value;
        console.log("hola")
        ubicacion.calle = this.getCalle.value;
        ubicacion.numeroExterior = this.getNumeroExterior.value;
        ubicacion.latitud = String(this.lat);
        ubicacion.longitud = String(this.lng);
        this.getNumeroInterior.value
          ? ubicacion.numeroInterior = this.getNumeroInterior.value
          : null;
        empresa.ubicaciones.push(ubicacion);
        this.guardarEmpresa(empresa);
      }
    }catch(err){
      console.log(err);
    }
   
  }
  public guardarEmpresa(empresa: Empresa) {
    return new Promise((resolve, reject) => {
      this._serEmpresa.guardarEmpresa(empresa).subscribe(
        (empresa: Empresa) => {
          console.log("SE GUARDO");
          this.dialogRef.close(null);
          resolve(null);
        }, (err: HttpErrorResponse) => {
          console.log("FALLIDO");
          reject();
        }
      )
    })

  }
  mostrarTextoAutoCompleteColonia(colonia: Colonia) {
    if (colonia) return colonia.nombre;
  }
  get getNombre() {
    return this.datosForm.get('nombre');
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
}
