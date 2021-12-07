import mongoose, { Document, Schema } from 'mongoose';
import { IEmpleado } from './empleado.model';
import { ICodigoPostal } from './ubicacion/codigoPostal.model';
import { IColonia } from './ubicacion/colonia.model';

export interface IRegistroEntrada extends Document {
    fechaEntrada: string,
    _idEmpleado: IEmpleado['_id'],
    horaEntrada: string,
    fotografia: string,
    ubicacion: {
        latitud: string;
        longitud: string;
        _idCodigoPostal: ICodigoPostal['_id'];
        calle: string;
        _idColonia: IColonia['_id'];
        numeroExterior: string;
        numeroInterior: string;
    }[];
}

const registroEntradaSchema = new Schema({
    fechaEntrada: { type: String, required: true },
    _idEmpleados: { type: Schema.Types.ObjectId, ref: 'empleados' },
    horaEntrada: { type: String, required: true },
    fotografia: { type: String, required: true },
    ubicacion:
    {
        latitud: { type: String, required: true },
        longitud: { type: String, required: true },
        _idCodigoPostal: { type: Schema.Types.ObjectId, ref: 'codigospostales' },
        calle: { type: String, required: true },
        _idColonia: { type: Schema.Types.ObjectId, ref: 'colonias' },
        numeroExterior: { type: String, required: true },
        numeroInterior: { type: String, required: false },

    }
});

export const RegistroEntrada = mongoose.model<IRegistroEntrada>('registrosentradas', registroEntradaSchema);