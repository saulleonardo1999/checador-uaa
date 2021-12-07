import { Request, Response } from 'express';
import { Horario, IHorario } from '../modelos/horario.model';

export let crearHorario = (req: Request, res: Response) => {
    _crearHorario(new Horario(req.body), res);
}
export let obtenerHorarios = (req: Request, res: Response) => {
    _obtenerHorarios(req, res)
}
export let obtenerHorariosPorEmpresa = (req: Request, res: Response) => {
    _obtenerHorariosPorEmpresa(req, res)
}

async function _crearHorario(horario: IHorario, res: Response) {
    try {
        horario.save((err: any, hr: any) => {
            if (err) {
                return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar, por favor intentalo de nuevo mas tarde' });
            } else if (hr) {
                return res.status(201).json(hr);
            }
        })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar, por favor intentalo de nuevo mas tarde' });
    }
}

async function _obtenerHorarios(req: Request, res: Response) {
    try {
        Horario
            .find({},)
            .populate({ path: '_idEmpresa' })
            .exec((err: any, supAdmins: IHorario[]) => {
                if (err) {
                    console.log(err);
                    return res.status(422).send({ titulo: 'Error al obtener la lista de Administradores', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });
                } else if (supAdmins) {
                    return res.status(201).json(supAdmins);
                }
            })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al obtener la lista de Administradores', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });

    }
}
async function _obtenerHorariosPorEmpresa(req: Request, res: Response) {
    let idEmpresa: string = req.params.id;
    try {
        Horario
            .find({_idEmpresa: idEmpresa},)
            .populate({ path: '_idEmpresa' })
            .exec((err: any, supAdmins: IHorario[]) => {
                if (err) {
                    console.log(err);
                    return res.status(422).send({ titulo: 'Error al obtener la lista de Administradores', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });
                } else if (supAdmins) {
                    return res.status(201).json(supAdmins);
                }
            })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al obtener la lista de Administradores', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });

    }
}