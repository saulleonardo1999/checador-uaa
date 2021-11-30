import { Request, Response } from 'express';
import { CodigoPostal } from '../../modelos/ubicacion/codigoPostal.model';

export let obtenerCodigosPostales = async (req: Request, res: Response) => {
    _obtenerCodigosPostales(req, res);
}

function _obtenerCodigosPostales(req: Request, res: Response) {
    const filtro: string = String(req.params.cp);
    const inicio: number = 0;
    const fin: number = 1;
    CodigoPostal
        .findOne()
        .where({
            $and: [
                { c_CodigoPostal: filtro }
            ]
        })
        .skip(inicio)
        .limit(fin)
        .exec((err, codigosPostales) => {
            if (err)
                return res.status(422).send(
                    {
                        titulo: 'Error al obtener los códigos postales',
                        detalles: 'Ocurrió un error al obtener listado de códigos postales, por favor intentalo de nuevo mas tarde',
                        error: err
                    });
            return res.status(200).json(codigosPostales);
        });

}