import mongoose, { Document, Schema } from 'mongoose';
import { IEmpresa } from './empresa.model';

export interface IHorario extends Document {
    nombre: string,
    horaEntrada: string,
    horaSalida: string,
    _idEmpresa: IEmpresa['_id'],
}

const horarioSchema = new Schema({
    nombre: { type: String, required: true },
    horaEntrada: { type: String, required: true },
    horaSalida: { type: String, required: true },
    _idEmpresa: { type: Schema.Types.ObjectId, ref: 'empresas' },
});

export const Horario = mongoose.model<IHorario>('horarios', horarioSchema);