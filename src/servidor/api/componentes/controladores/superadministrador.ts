import { Request, Response } from 'express';
import { ISuperAdministrador, SuperAdministrador } from '../modelos/superadministrador.model';
import { NativeError } from 'mongoose';
import { EXPIRACION_TOKEN, SECRET_TOKEN } from '../../../config/globales';
import jwt from 'jsonwebtoken';
import obtenerToken from './autenticacion';

export let crearSuperAdmin = (req: Request, res: Response) =>{
    _crearSuperAdmin(new SuperAdministrador(req.body), res);
}

async function _crearSuperAdmin(admin:ISuperAdministrador, res: Response){
    try{
        admin.save((err:any, admin:any) => {
            if (err) {
                    return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar el superusuario, por favor intentalo de nuevo mas tarde' });
                } else if (admin) {
                    let token = obtenerToken(admin);
                    return res.status(201).json({token: token});
                } else {
                    return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar el superusuario, por favor intentalo de nuevo mas tarde' });
                }
            })
    }catch(error: any){

    }
}