import mongoose, {Document, Schema} from 'mongoose';

export interface ISuperAdministrador extends Document{
    nombre: string,
    apellidoMaterno: string,
    apellidoPaterno: string,
    correo: string,
    password: string,
    token: string,
}

const superadministradorSchema = new Schema({
    nombre: {type: String, required: true},
    apellidoMaterno: {type: String, required: true},
    apellidoPaterno: {type: String, required: true},
    correo: {type: String, required: true},
    password: {type: String, required: true},
});

export const SuperAdministrador = mongoose.model<ISuperAdministrador>('superadministradores',superadministradorSchema);