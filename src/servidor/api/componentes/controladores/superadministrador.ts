import { Request, Response } from 'express';
import { ISuperAdministrador, SuperAdministrador } from '../modelos/superadministrador.model';
import { obtenerToken, cifrarPassword } from './autenticacion';

export let crearSuperAdmin = (req: Request, res: Response) => {
    _crearSuperAdmin(new SuperAdministrador(req.body), res);
}
export let obtenerSuperAdminastradores = (req: Request, res: Response) => {
    _obtenerSuperAdminastradores(req, res)
}
export let editarSuperAdministrador = (req: Request, res: Response) => {
    _editarSuperAdministrador(req, res)
}
export let eliminarSuperAdministrador = (req: Request, res: Response) => {
    _eliminarSuperAdministrador(req, res)
}

async function _crearSuperAdmin(admin: ISuperAdministrador, res: Response) {
    try {
        admin.password = await cifrarPassword(admin.password);
        admin.save((err: any, admin: any) => {
            if (err) {
                console.log(err);
                return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar el superusuario, por favor intentalo de nuevo mas tarde' });
            } else if (admin) {
                let token = obtenerToken(admin);
                return res.status(201).json({ token: token });
            }
        })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar el superusuario, por favor intentalo de nuevo mas tarde' });
    }
}

async function _obtenerSuperAdminastradores(req: Request, res: Response) {
    try {
        SuperAdministrador
            .find({}, { password: 0 })
            .exec((err: any, supAdmins: ISuperAdministrador[]) => {
                if (err) {
                    console.log(err);
                    return res.status(422).send({ titulo: 'Error al obtener la lista de SuperAdministradores', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });
                } else if (supAdmins) {
                    return res.status(201).json(supAdmins);
                }
            })
    } catch (error: any) {
        return res.status(422).send({ titulo: 'Error al obtener la lista de SuperAdministradores', detalles: "Ocurrió un error al obtener la lista, intente por favor más tarde" });

    }
}

async function _editarSuperAdministrador(req: Request, res: Response) {
    const admin: ISuperAdministrador = (<ISuperAdministrador>req.body);
    try {
        SuperAdministrador
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
async function _eliminarSuperAdministrador(req: Request, res: Response) {
    const admin = {"_id": req.params.id};
    console.log(admin);
    try {
        SuperAdministrador
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