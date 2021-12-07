import { EXPIRACION_TOKEN, SECRET_TOKEN } from '../../../config/globales';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { ISuperAdministrador, SuperAdministrador } from '../modelos/superadministrador.model';
import { Administrador, IAdministrador } from '../modelos/administrador.model';
import { Empleado, IEmpleado } from '../modelos/empleado.model';
const saltRounds = 10;

export function obtenerToken(datosToken: any): any {
  return jwt.sign(datosToken.toJSON(), SECRET_TOKEN, { expiresIn: EXPIRACION_TOKEN });
}
export let obtenerInicioSesionSuperAdministrador = (req: Request, res: Response) => {
  _obtenerIncioSesionSuperAdministrador(req, res);
}
export let obtenerInicioSesionAdministrador = (req: Request, res: Response) => {
  _obtenerIncioSesionAdministrador(req, res);
}
export let obtenerInicioSesionEmpleado = (req: Request, res: Response) => {
  _obtenerIncioSesionEmpleado(req, res);
}

async function _obtenerIncioSesionSuperAdministrador(req: Request, res: Response) {
  const correo = String(req.body.correo);
  const password = String(req.body.password);
  SuperAdministrador
    .findOne({ correo: correo })
    .exec(async (err, admin) => {
      if (err) {
        res.status(422).json({ Titulo: "Error del servidor" , Descripción: "Intente más tarde" })
      }
      else if (admin) {
        let administrador: ISuperAdministrador = admin;
        const matchPassword:boolean = await compararPassword(password, administrador.password); 
        if (matchPassword) {
          let token:string  = await obtenerToken(administrador);
          console.log(token);
          res.locals.token = token;
          res.locals.superAdministrador = administrador;
          res.status(201).json({"token": `${token}`})
        } else {
          res.status(403).json({ Titulo: "Inicio de sesión Fallida", Descripción: "Tus credenciales son inválidas" })
        }

      } else {
        res.status(422).json({ Titulo: "Error del servidor intente mas tarde", Descripción: "Intente más tarde" })
      }
    });
}
async function _obtenerIncioSesionAdministrador(req: Request, res: Response) {
  const correo = String(req.body.correo);
  const password = String(req.body.password);
  Administrador
    .findOne({ correo: correo })
    .exec(async (err, admin) => {
      if (err) {
        res.status(422).json({ Titulo: "Error del servidor" , Descripción: "Intente más tarde" })
      }
      else if (admin) {
        let administrador: IAdministrador = admin;
        const matchPassword:boolean = await compararPassword(password, administrador.password); 
        if (matchPassword) {
          let token:string  = await obtenerToken(administrador);
          console.log(token);
          res.locals.token = token;
          res.locals.superAdministrador = administrador;
          res.status(201).json({"token": `${token}`})
        } else {
          res.status(403).json({ Titulo: "Inicio de sesión Fallida", Descripción: "Tus credenciales son inválidas" })
        }

      } else {
        res.status(422).json({ Titulo: "Error del servidor intente mas tarde", Descripción: "Intente más tarde" })
      }
    });
}
async function _obtenerIncioSesionEmpleado(req: Request, res: Response) {
  const correo = String(req.body.correo);
  const password = String(req.body.password);
  Empleado
    .findOne({ correo: correo })
    .exec(async (err, admin) => {
      if (err) {
        res.status(422).json({ Titulo: "Error del servidor" , Descripción: "Intente más tarde" })
      }
      else if (admin) {
        let administrador: IEmpleado = admin;
        const matchPassword:boolean = await compararPassword(password, administrador.password); 
        if (matchPassword) {
          let token:string  = await obtenerToken(administrador);
          console.log(token);
          res.locals.token = token;
          res.locals.superAdministrador = administrador;
          res.status(201).json({"token": `${token}`})
        } else {
          res.status(403).json({ Titulo: "Inicio de sesión Fallida", Descripción: "Tus credenciales son inválidas" })
        }

      } else {
        res.status(422).json({ Titulo: "Error del servidor intente mas tarde", Descripción: "Intente más tarde" })
      }
    });
}
export async function cifrarPassword(password: string): Promise<any> {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err:any) {
    return err;
  }

}

export async function compararPassword(passwordUser: string, passwordDB: string): Promise<boolean> {
  return await bcrypt.compare(passwordUser, passwordDB);
}