import { Request, Response } from 'express';
import { IMateria, Materia } from '../modelos/materia.model';

export let crearMateria = (req: Request, res: Response) => {
    _crearMateria(new Materia(req.body), res);
}
export let obtenerMaterias = (req: Request, res: Response) => {
    _obtenerMaterias(req, res)
}
export let editarMateria = (req: Request, res: Response) => {
    _editarMateria(req, res)
}
export let eliminarMateria = (req: Request, res: Response) => {
    _eliminarMateria(req, res)
}

async function _crearMateria(materia: IMateria, res: Response) {
    try {
        materia.activo = true;
        materia.save((err: any, nuevaMateria: any) => {
            if (err) {
                return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar, por favor intentalo de nuevo mas tarde' });
            } else if (nuevaMateria) {
                return res.status(201).send(nuevaMateria);
            }
        })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar, por favor intentalo de nuevo mas tarde' });
    }
}

async function _obtenerMaterias(req: Request, res: Response) {
    try {
        Materia
            .find({}, { password: 0 })
            .exec((err: any, materias: IMateria[]) => {
                if (err) {
                    return res.status(422).send({ titulo: 'Error al obtener la lista de materias', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });
                } else if (materias) {
                    return res.status(201).json(materias);
                }
            })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al obtener la lista de materias', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });

    }
}
async function _editarMateria(req: Request, res: Response) {
    const materia: IMateria = (<IMateria>req.body);
    try {
        Materia
            .findByIdAndUpdate({ _id: materia._id }, materia)
            .exec((err: any, materiaEditada: any) => {
                if (err) {
                    return res.status(422).send({ titulo: 'Error al editar', detalles: "Ocurrió un error al editar, intente por favor más tarde" });
                } else if (materiaEditada) {
                    return res.status(200).json(materiaEditada);
                }
            })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al editar', detalles: "Ocurrió un error al editar, intente por favor más tarde" });
    }
}
async function _eliminarMateria(req: Request, res: Response) {
    const materia = { "_id": req.params.id };
    try {
        Materia
            .findByIdAndUpdate({ _id: materia._id }, {activo:false})
            .exec((err: any, materiaEliminada: any) => {
                if (err) {
                    return res.status(422).send({ titulo: 'Error al eliminar', detalles: "Ocurrió un error al eliminar, intente por favor más tarde" });
                } else if (materiaEliminada) {
                    return res.status(200).json(materiaEliminada);
                }
            })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al eliminar', detalles: "Ocurrió un error al eliminar, intente por favor más tarde" });

    }
}