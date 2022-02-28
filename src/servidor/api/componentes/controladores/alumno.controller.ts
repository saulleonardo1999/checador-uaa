import { Request, Response } from 'express';
import { Alumno, IAlumno } from '../modelos/alumno.model';

export let crearAlumno = (req: Request, res: Response) => {
    _crearAlumno(new Alumno(req.body), res);
}
export let obtenerAlumnos = (req: Request, res: Response) => {
    _obtenerAlumnos(req, res)
}
export let editarAlumno = (req: Request, res: Response) => {
    _editarAlumno(req, res)
}
export let eliminarAlumno = (req: Request, res: Response) => {
    _eliminarAlumno(req, res)
}

async function _crearAlumno(alumno: IAlumno, res: Response) {
    try {
        alumno.activo = true;
        alumno.save((err: any, nuevoAlumno: any) => {
            if (err) {
                return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar, por favor intentalo de nuevo mas tarde' });
            } else if (nuevoAlumno) {
                return res.status(201).send(nuevoAlumno);
            }
        })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar, por favor intentalo de nuevo mas tarde' });
    }
}

async function _obtenerAlumnos(req: Request, res: Response) {
    try {
        Alumno
            .find({}, { password: 0 })
            .exec((err: any, alumnos: IAlumno[]) => {
                if (err) {
                    return res.status(422).send({ titulo: 'Error al obtener la lista de alumnos', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });
                } else if (alumnos) {
                    return res.status(201).json(alumnos);
                }
            })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al obtener la lista de alumnos', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });

    }
}
async function _editarAlumno(req: Request, res: Response) {
    const alumno: IAlumno = (<IAlumno>req.body);
    try {
        Alumno
            .findByIdAndUpdate({ _id: alumno._id }, alumno)
            .exec((err: any, alumnoEditado: any) => {
                if (err) {
                    return res.status(422).send({ titulo: 'Error al editar', detalles: "Ocurrió un error al editar, intente por favor más tarde" });
                } else if (alumnoEditado) {
                    return res.status(200).json(alumnoEditado);
                }
            })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al editar', detalles: "Ocurrió un error al editar, intente por favor más tarde" });
    }
}
async function _eliminarAlumno(req: Request, res: Response) {
    const alumno = { "_id": req.params.id };
    try {
        Alumno
            .findByIdAndUpdate({ _id: alumno._id }, {activo:false})
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