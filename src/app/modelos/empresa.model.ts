import { CodigoPostal } from "./ubicacion/codigoPostal.model";
import { Colonia } from "./ubicacion/colonia.model";

export class Ubicacion{
    latitud: string;
    longitud: string;
    _idCodigoPostal: CodigoPostal;
    calle: string;
    _idColonia: Colonia;
    numeroExterior: string;
    numeroInterior: string;
}
export class Empresa {
    _id?:string;
    nombre: string;
    estatus: boolean;
    ubicaciones: Ubicacion[];
    constructor(){
        this.ubicaciones = [];
    }
}