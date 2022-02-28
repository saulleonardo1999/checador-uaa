import { Request, Response } from 'express';
import { IProfesor, Profesor } from '../modelos/profesor.model';

export let crearProfesor = (req: Request, res: Response) => {
    _crearProfesor(new Profesor(req.body), res);
}
export let obtenerProfesores = (req: Request, res: Response) => {
    _obtenerProfesores(req, res)
}
export let editarProfesor = (req: Request, res: Response) => {
    _editarProfesor(req, res)
}
export let eliminarProfesor = (req: Request, res: Response) => {
    _eliminarProfesor(req, res)
}

async function _crearProfesor(profesor: IProfesor, res: Response) {
    try {
        profesor.activo = true;
        profesor.save((err: any, nuevoProfesor: any) => {
            if (err) {
                return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar al profesor, por favor intentalo de nuevo mas tarde' });
            } else if (nuevoProfesor) {
                return res.status(201).send(nuevoProfesor);
            }
        })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar el profesor, por favor intentalo de nuevo mas tarde' });
    }
}

async function _obtenerProfesores(req: Request, res: Response) {
    try {
        Profesor
            .find({}, { password: 0 })
            .exec((err: any, profesores: IProfesor[]) => {
                if (err) {
                    return res.status(422).send({ titulo: 'Error al obtener la lista de profesores', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });
                } else if (profesores) {
                    return res.status(201).json(profesores);
                }
            })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al obtener la lista de profesores', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });

    }
}
async function _editarProfesor(req: Request, res: Response) {
    const profesor: IProfesor = (<IProfesor>req.body);
    try {
        Profesor
            .findByIdAndUpdate({ _id: profesor._id }, profesor)
            .exec((err: any, profesorEditado: any) => {
                if (err) {
                    return res.status(422).send({ titulo: 'Error al editar', detalles: "Ocurrió un error al editar, intente por favor más tarde" });
                } else if (profesorEditado) {
                    return res.status(200).json(profesorEditado);
                }
            })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al editar', detalles: "Ocurrió un error al editar, intente por favor más tarde" });
    }
}
async function _eliminarProfesor(req: Request, res: Response) {
    const profesor = { "_id": req.params.id };
    try {
        Profesor
            .findByIdAndUpdate({ _id: profesor._id }, { activo: false })
        .exec((err: any, profesorEliminado: any) => {
                if (err) {
                    return res.status(422).send({ titulo: 'Error al eliminar', detalles: "Ocurrió un error al eliminar, intente por favor más tarde" });
                } else if (profesorEliminado) {
                    return res.status(200).json(profesorEliminado);
                }
            })
} catch (error: any) {
    return res.status(422).send({ titulo: 'Error al eliminar', detalles: "Ocurrió un error al eliminar, intente por favor más tarde" });

}
}