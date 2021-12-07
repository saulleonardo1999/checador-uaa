import { Empresa } from "./empresa.model";

export class Administrador {
    _id?:string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correo: string;
    password: string;
    _idEmpresa: Empresa;
    estatus: boolean;
}