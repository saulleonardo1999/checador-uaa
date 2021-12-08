import { Empresa } from "./empresa.model";

export class Suscripcion {
    _id: string;
    fechaInicio: string;
    fechaFinal: string;
    estadoPago: boolean;
    _idEmpresa: Empresa;
    tipo: number;
}