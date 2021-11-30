import mongoose, { Document, Schema } from 'mongoose';
import { ICodigoPostal } from './ubicacion/codigoPostal.model';
import { IColonia } from './ubicacion/colonia.model';

export interface IEmpresa extends Document {
    nombre: string,
    estatus: boolean,
    ubicaciones: {
        latitud: string;
        longitud: string;
        _idCodigoPostal: ICodigoPostal['_id'];
        calle: string;
        _idColonia: IColonia['_id'];
        numeroExterior: string;
        numeroInterior: string;
    }[];
}

const empresaSchema = new Schema({
    nombre: { type: String, required: true },
    estatus: { type: Boolean, required: true },
    ubicaciones: {
        type: [
            {
                latitud: { type: String, required: true },
                longitud: { type: String, required: true },
                _idCodigoPostal: { type: Schema.Types.ObjectId, ref: 'codigospostales' },
                calle: { type: String, required: true },
                _idColonia: { type: Schema.Types.ObjectId, ref: 'colonias' },
                numeroExterior: { type: String, required: true },
                numeroInterior: { type: String, required: false },

            }
        ]
    }
});

export const Empresa = mongoose.model<IEmpresa>('empresas', empresaSchema);