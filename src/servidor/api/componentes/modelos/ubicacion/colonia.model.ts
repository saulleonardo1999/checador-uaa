import mongoose, { Document, Schema } from 'mongoose';

export interface IColonia extends Document {
    c_Colonia: string;
    c_CodigoPostal: string;
    nombre: string;
}

const coloniasSchema = new Schema({
    c_Colonia: { type: String, required: [true, 'Por favor, ingresa el campo c_Colonia'] },
    c_CodigoPostal: { type: String, required: [true, 'Por favor, ingresa el campo c_CodigoPostal'] },
    nombre: { type: String, required: [true, 'Por favor, ingresa el campo nombre'] },
});
export const Colonia = mongoose.model<IColonia>('colonias', coloniasSchema);