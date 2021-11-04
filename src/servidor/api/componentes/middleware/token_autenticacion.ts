import { EXPIRACION_TOKEN, SECRET_TOKEN } from "../../../config/globales";
import jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from "express";
import { ISuperAdministrador, SuperAdministrador } from "../modelos/superadministrador.model";
import { NativeError } from "mongoose";

export let autenticacionSuperadministradorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (token) _verificarExpiracionTokenSuperAdministrador(token, res, next);
    else return res.status(401).send({ titulo: 'No autorizado', detalles: 'Necesitar iniciar sesion para tener acceso' })
}

function _verificarExpiracionTokenSuperAdministrador(token: any, res: Response, next: NextFunction) {
    jwt.verify(token.split(' ')[1], SECRET_TOKEN, function (err: any, decodificado: any) {
        if (err) return res.status(401).send({ titulo: 'Sesion expirada', detalles: 'La sesion ha expirado, por favor vuelve a iniciar sesion' });
        else {
            const usuario: ISuperAdministrador = decodificado;
            SuperAdministrador.findById(usuario._id)
                .exec((err, administrador ) => {
                    if (administrador) {
                        res.locals.administrador = administrador;
                        next();
                    } else {
                        return res.status(401).send({ titulo: 'No autorizado', detalles: 'Necesitar iniciar sesion para tener acceso' })
                    }
                })
        }
    })
}