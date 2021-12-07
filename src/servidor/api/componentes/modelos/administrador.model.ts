import mongoose, { Document, Schema } from 'mongoose';
import { IEmpresa } from './empresa.model';

export interface IAdministrador extends Document {
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    correo: string,
    password: string,
    _idEmpresa: IEmpresa['_id'],
    estatus: boolean,
  
}

const administradorSchema = new Schema({
    nombre: { type: String, required: true },
    apellidoMaterno: { type: String, required: true },
    apellidoPaterno: { type: String, required: true },
    correo: { type: String, required: true },
    password: { type: String, required: true },
    _idEmpresa: { type: Schema.Types.ObjectId, ref: 'empresas', required: true },
    estatus: { type: Boolean, required: true },
});

export const Administrador = mongoose.model<IAdministrador>('administradores', administradorSchema);