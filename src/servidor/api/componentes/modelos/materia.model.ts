import mongoose, { Document, Schema } from 'mongoose';

export interface IMateria extends Document {
    nombre: string,
    codigoMateria: string,
    escolaridad: string,
    activo: boolean;
}

const materiaSchema = new Schema({
    nombre: { type: String, required: true },
    escolaridad: { type: String, required: true },
    codigoMateria: { type: String, required: true },
    activo: { type: Boolean, required: true },
    
});

export const Materia = mongoose.model<IMateria>('materias', materiaSchema);