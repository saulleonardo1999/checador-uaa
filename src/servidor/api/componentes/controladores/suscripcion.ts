import { Request, Response } from 'express';
import { ISuscripcion, Suscripcion } from '../modelos/suscripcion.model';

export let crearSuscripcion = (req: Request, res: Response) => {
    _crearSuscripcion(new Suscripcion(req.body), res);
}
export let obtenerSuscripciones = (req: Request, res: Response) => {
    _obtenerSuscripciones(req, res)
}
export let obtenerSuscripcionesPorEmpresa = (req: Request, res: Response) => {
    _obtenerSuscripcionesPorEmpresa(req, res)
}

async function _crearSuscripcion(sub: ISuscripcion, res: Response) {
    try {
        sub.save((err: any, suscripcion: any) => {
            if (err) {
                return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar, por favor intentalo de nuevo mas tarde' });
            } else if (suscripcion) {
                return res.status(201).json(suscripcion);
            }
        })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar, por favor intentalo de nuevo mas tarde' });
    }
}

async function _obtenerSuscripciones(req: Request, res: Response) {
    try {
        Suscripcion
            .find({},)
            .populate({ path: '_idEmpresa' })
            .exec((err: any, suscripciones: ISuscripcion[]) => {
                if (err) {
                    return res.status(422).send({ titulo: 'Error al obtener la lista', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });
                } else if (suscripciones) {
                    return res.status(201).json(suscripciones);
                }
            })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al obtener la lista', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });

    }
}
async function _obtenerSuscripcionesPorEmpresa(req: Request, res: Response) {
    let idEmpresa: string = req.params.id;
    try {
        Suscripcion
            .find({_idEmpresa: idEmpresa},)
            .populate({ path: '_idEmpresa' })
            .exec((err: any, sub: ISuscripcion[]) => {
                if (err) {
                    return res.status(422).send({ titulo: 'Error al obtener la lista', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });
                } else if (sub) {
                    return res.status(201).json(sub);
                }
            })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al obtener la lista', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });

    }
}