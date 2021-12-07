import { Request, Response } from 'express';
import { HorarioTrabajado, IHorarioTrabajado } from '../modelos/horarioTrabajado.model';

export let crearHorarioTrabajado = (req: Request, res: Response) => {
    _crearHorarioTrabajado(new HorarioTrabajado(req.body), res);
}
export let obtenerHorariosTrabajadosPorEmpleado = (req: Request, res: Response) => {
    _obtenerHorariosTrabajadosPorEmpleado(req, res)
}


async function _crearHorarioTrabajado(horario: IHorarioTrabajado, res: Response) {
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

async function _obtenerHorariosTrabajadosPorEmpleado(req: Request, res: Response) {
    let idEmpleado = String(req.params.id);
    try {
        HorarioTrabajado
            .find({_idEmpleado: idEmpleado})
            .populate({ path: '_idEmpresa' })
            .populate({ path: '_idEmpleado' })
            .exec((err: any, horarios: IHorarioTrabajado[]) => {
                if (err) {
                    console.log(err);
                    return res.status(422).send({ titulo: 'Error al obtener la lista', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });
                } else if (horarios) {
                    return res.status(201).json(horarios);
                }
            })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al obtener la lista', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });

    }
}