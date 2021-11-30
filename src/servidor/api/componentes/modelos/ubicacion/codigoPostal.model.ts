import mongoose, { Document, Schema } from 'mongoose';

export interface ICodigoPostal extends Document {
    c_CodigoPostal: string,
    c_Estado: string,
    c_Municipio: string,
    c_Localidad: string,
}

const codigoPostalSchema = new Schema({
    c_CodigoPostal: { type: String, required: [true, 'Por favor, ingresa el campo c_CodigoPostal'] },
    c_Estado: { type: String, required: [true, 'Por favor, ingresa el campo c_Estado'] },
    c_Municipio: { type: String, required: [true, 'Por favor, ingresa el campo c_Municipio'] },
    c_Localidad: { type: String, required: [true, 'Por favor, ingresa el campo c_Localidad'] },
});

export const CodigoPostal = mongoose.model<ICodigoPostal>('codigospostales', codigoPostalSchema);