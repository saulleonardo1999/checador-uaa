import { Request, Response } from 'express';
import { IAdministrador, Administrador } from '../modelos/administrador.model';
import { obtenerToken, cifrarPassword } from './autenticacion';

export let crearAdmin = (req: Request, res: Response) => {
    _crearAdmin(new Administrador(req.body), res);
}
export let obtenerAdminastradores = (req: Request, res: Response) => {
    _obtenerAdministradores(req, res)
}
export let obtenerAdminastradoresPorEmpresa = (req: Request, res: Response) => {
    _obtenerAdministradoresPorEmpresa(req, res)
}
export let editarAdministrador = (req: Request, res: Response) => {
    _editarAdministrador(req, res)
}
export let eliminarAdministrador = (req: Request, res: Response) => {
    _eliminarAdministrador(req, res)
}

async function _crearAdmin(admin: IAdministrador, res: Response) {
    try {
        admin.estatus = true;
        admin.password = await cifrarPassword(admin.password);
        admin.save((err: any, admin: any) => {
            if (err) {
                console.log(err);
                return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar el administrador, por favor intentalo de nuevo mas tarde' });
            } else if (admin) {
                let token = obtenerToken(admin);
                return res.status(201).json({ token: token });
            }
        })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar el administrador, por favor intentalo de nuevo mas tarde' });
    }
}

async function _obtenerAdministradores(req: Request, res: Response) {
    try {
        Administrador
            .find({}, { password: 0 })
            .populate({ path: '_idEmpresa' })
            .exec((err: any, admins: IAdministrador[]) => {
                if (err) {
                    console.log(err);
                    return res.status(422).send({ titulo: 'Error al obtener la lista de Administradores', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });
                } else if (admins) {
                    console.log(admins);
                    return res.status(201).json(admins);
                }
            })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al obtener la lista de Administradores', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });

    }
}
async function _obtenerAdministradoresPorEmpresa(req: Request, res: Response) {
    let idEmpresa = String(req.params.id);
    try {
        Administrador
            .find({_idEmpresa: idEmpresa}, { password: 0 })
            .populate({ path: '_idEmpresa' })
            .exec((err: any, supAdmins: IAdministrador[]) => {
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

async function _editarAdministrador(req: Request, res: Response) {
    const admin: IAdministrador = (<IAdministrador>req.body);
    try {
        Administrador
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
async function _eliminarAdministrador(req: Request, res: Response) {
    const admin = {"_id": req.params.id};
    console.log(admin);
    try {
        Administrador
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