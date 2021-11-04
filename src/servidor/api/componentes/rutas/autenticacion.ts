import {Router} from 'express';
import *  as AutenticacionCtrl from '../controladores/autenticacion';
const autenticacionRutas = Router();


/**POST */
autenticacionRutas.post('/superadministrador', AutenticacionCtrl.obtenerInicioSesionSuperAdministrador);




export default autenticacionRutas;