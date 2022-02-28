import mongoose, { Document, Schema } from 'mongoose';

export interface IAlumno extends Document {
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    escolaridad: string;
    fechaNacimiento: string;
    activo: boolean;
}

const alumnoSchema = new Schema({
    nombre: { type: String, required: true },
    apellidoMaterno: { type: String, required: true },
    apellidoPaterno: { type: String, required: true },
    escolaridad: { type: String, required: true },
    fechaNacimiento: { type: String, required: true },
    activo: { type: Boolean, required: true },
});

export const Alumno = mongoose.model<IAlumno>('alumnos', alumnoSchema);