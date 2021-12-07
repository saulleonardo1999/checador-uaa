import mongoose, { Document, Schema } from 'mongoose';
import { IEmpresa } from './empresa.model';

export interface ISuscripcion extends Document {
    fechaInicio: string,
    fechaFinal: string,
    estadoPago: boolean,
    _idEmpresa: IEmpresa['_id'],
    tipo: number
}
//tipo 0: Anual 
//tipo 1: Mensual

const suscripcionSchema = new Schema({
    fechaInicio: { type: String, required: true },
    fechaFinal: { type: String, required: true },
    estadoPago: { type: Boolean, required: true },
    _idEmpresa: { type: Schema.Types.ObjectId, ref: 'empresas' },
    tipo: { type: Number, required: true },
});

export const Suscripcion = mongoose.model<ISuscripcion>('suscripciones', suscripcionSchema);