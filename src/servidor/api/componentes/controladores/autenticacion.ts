import { EXPIRACION_TOKEN, SECRET_TOKEN } from '../../../config/globales';
import jwt from 'jsonwebtoken';

export default function obtenerToken(datosToken: any) : any {
    return jwt.sign(datosToken.toJSON(), SECRET_TOKEN, {expiresIn: EXPIRACION_TOKEN});
}
export function cifrarPassword(password: string): string {
    return ""
}