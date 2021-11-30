import { Colonia, IColonia } from "../../modelos/ubicacion/colonia.model";
import { Request, Response } from 'express';
export let obtenerColonias = async (req: Request, res: Response) => {
    _obtenerColonias(req, res);
}
function _obtenerColonias(req: Request, res: Response) {
    const filtro: string = String(req.query.filtro);
    const inicio: number = 0;
    const fin: number = 10;
    const cp = req.query.cp
        ? { "c_CodigoPostal": String(req.query.cp) }
        : {};
    Colonia
        .find()
        .where({
            $and: [
                cp,
                { nombre: { $regex: filtro, $options: "i" } }
            ]
        })
        .skip(inicio)
        .limit(fin)
        .exec((err, colonias: IColonia[]) => {
            if (err) return res.status(422).send({ titulo: 'Error al obtener colonias', detalles: 'Ocurrió un error al obtener listado de colonias, por favor intentalo de nuevo mas tarde' });
            return res.status(200).json(colonias);
        });
}

