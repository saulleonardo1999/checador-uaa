import { Request, Response } from 'express';
import { IRegistroEntrada, RegistroEntrada } from '../modelos/registroEntrada.model';

export let crearRegistro = (req: Request, res: Response) => {
    _crearRegistro(new RegistroEntrada(req.body), res);
}
export let obtenerRegistrosPorEmpleado = (req: Request, res: Response) => {
    _obtenerRegistrosPorEmpleado(req, res)
}

async function _crearRegistro(registro: IRegistroEntrada, res: Response) {
    try {
        registro.save((err: any, reg: any) => {
            if (err) {
                return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar, por favor intentalo de nuevo mas tarde' });
            } else if (reg) {
                return res.status(201).json(reg);
            }
        })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar, por favor intentalo de nuevo mas tarde' });
    }
}

async function _obtenerRegistrosPorEmpleado(req: Request, res: Response) {
    let idEmpleado: string = req.params.id;
    try {
        RegistroEntrada
            .find({_idEmpleado: idEmpleado})
            .populate({ path: '_idEmpleado' })
            .exec((err: any, registros: IRegistroEntrada[]) => {
                if (err) {
                    return res.status(422).send({ titulo: 'Error al obtener la lista', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });
                } else if (registros) {
                    return res.status(201).json(registros);
                }
            })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al obtener la lista', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });

    }
}