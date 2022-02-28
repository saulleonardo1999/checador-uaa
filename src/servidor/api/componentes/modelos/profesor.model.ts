import mongoose, { Document, Schema } from 'mongoose';

export interface IProfesor extends Document {
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    rfc: string, 
    activo:boolean;
}

const profesorSchema = new Schema({
    nombre: { type: String, required: true },
    apellidoMaterno: { type: String, required: true },
    apellidoPaterno: { type: String, required: true },
    rfc: { type: String, required: true },
    activo: { type: Boolean, required: true },
});

export const Profesor = mongoose.model<IProfesor>('profesores', profesorSchema);