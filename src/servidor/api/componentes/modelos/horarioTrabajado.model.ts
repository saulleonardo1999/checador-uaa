import mongoose, { Document, Schema } from 'mongoose';
import { IEmpleado } from './empleado.model';
import { IEmpresa } from './empresa.model';

export interface IHorarioTrabajado extends Document {
    nombre: string,
    horaEntrada: string,
    horaSalida: string,
    _idEmpresa: IEmpresa['_id'],
    _idEmpleado: IEmpleado['_id'],
}

const horarioTrabajadoSchema = new Schema({
    nombre: { type: String, required: true },
    horaEntrada: { type: String, required: true },
    horaSalida: { type: String, required: true },
    _idEmpresa: { type: Schema.Types.ObjectId, ref: 'empresas' },
    _idEmpleado: { type: Schema.Types.ObjectId, ref: 'empleados' },
});

export const HorarioTrabajado = mongoose.model<IHorarioTrabajado>('horariostrabajados', horarioTrabajadoSchema);