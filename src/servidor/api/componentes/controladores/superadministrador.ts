import { Request, Response } from 'express';
import { ISuperAdministrador, SuperAdministrador } from '../modelos/superadministrador.model';
import { obtenerToken, cifrarPassword } from './autenticacion';

export let crearSuperAdmin = (req: Request, res: Response) => {
    _crearSuperAdmin(new SuperAdministrador(req.body), res);
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