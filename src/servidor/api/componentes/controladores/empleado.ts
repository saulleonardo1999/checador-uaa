import { Request, Response } from 'express';
import { Empleado, IEmpleado } from '../modelos/empleado.model';
import { obtenerToken, cifrarPassword } from './autenticacion';

export let crearEmpleado = (req: Request, res: Response) => {
    _crearEmpleado(new Empleado(req.body), res);
}
export let obtenerEmpleados = (req: Request, res: Response) => {
    _obtenerEmpleados(req, res)
}
export let obtenerEmpleadosPorEmpresa = (req: Request, res: Response) => {
    _obtenerEmpleadosPorEmpresa(req, res)
}
export let editarEmpleado = (req: Request, res: Response) => {
    _editarAdministrador(req, res)
}
export let eliminarEmpleado = (req: Request, res: Response) => {
    _eliminarEmpleado(req, res)
}

async function _crearEmpleado(empleado: IEmpleado, res: Response) {
    try {
        empleado.estatus = true;
        empleado.password = await cifrarPassword(empleado.password);
        empleado.save((err: any, emp: any) => {
            if (err) {
                console.log(err);
                return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar, por favor intentalo de nuevo mas tarde' });
            } else if (emp) {
                let token = obtenerToken(emp);
                return res.status(201).json({ token: token });
            }
        })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar, por favor intentalo de nuevo mas tarde' });
    }
}

async function _obtenerEmpleados(req: Request, res: Response) {
    try {
        Empleado
            .find({}, { password: 0 })
            .populate({ path: '_idEmpresa' })
            .exec((err: any, supAdmins: IEmpleado[]) => {
                if (err) {
                    console.log(err);
                    return res.status(422).send({ titulo: 'Error al obtener la lista', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });
                } else if (supAdmins) {
                    return res.status(201).json(supAdmins);
                }
            })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al obtener la lista', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });

    }
}

async function _obtenerEmpleadosPorEmpresa(req: Request, res: Response) {
    let idEmpresa = req.params.id
    try {
        Empleado
            .find({_idEmpresa: idEmpresa }, { password: 0 })
            .populate({ path: '_idEmpresa' })
            .exec((err: any, supAdmins: IEmpleado[]) => {
                if (err) {
                    console.log(err);
                    return res.status(422).send({ titulo: 'Error al obtener la lista', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });
                } else if (supAdmins) {
                    return res.status(201).json(supAdmins);
                }
            })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al obtener la lista', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });

    }
}

async function _editarAdministrador(req: Request, res: Response) {
    const admin: IEmpleado = (<IEmpleado>req.body);
    try {
        Empleado
            .findByIdAndUpdate({_id: admin._id}, admin)
            .exec((err: any, supAdmin: any) => {
                console.log(err, supAdmin);
                if (err) {
                    console.log(err);
                    return res.status(422).send({ titulo: 'Error al editar', detalles: "Ocurrió un error al editar, intente por favor más tarde" });
                } else if (supAdmin) {
                    console.log(supAdmin);
                    return res.status(200).json(supAdmin);
                }
            })
    } catch (error: any) {
        console.log(error);
        return res.status(422).send({ titulo: 'Error al editar', detalles: "Ocurrió un error al editar, intente por favor más tarde" });

    }
}
async function _eliminarEmpleado(req: Request, res: Response) {
    const admin = {"_id": req.params.id};
    console.log(admin);
    try {
        Empleado
            .findOneAndDelete(admin)
            .exec((err: any, supAdmin: any) => {
                if (err) {
                    console.log(err);
                    return res.status(422).send({ titulo: 'Error al eliminar', detalles: "Ocurrió un error al eliminar, intente por favor más tarde" });
                } else if (supAdmin) {
                    console.log(supAdmin)
                    return res.status(200).json(supAdmin);
                }
            })
    } catch (error: any) {
        console.log(error)
        return res.status(422).send({ titulo: 'Error al editar', detalles: "Ocurrió un error al editar, intente por favor más tarde" });

    }
}