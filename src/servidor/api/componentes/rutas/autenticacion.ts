import {Router} from 'express';
import *  as AutenticacionCtrl from '../controladores/autenticacion';
const autenticacionRutas = Router();


/**POST */
autenticacionRutas.post('/superadministrador', AutenticacionCtrl.obtenerInicioSesionSuperAdministrador);
autenticacionRutas.post('/administrador', AutenticacionCtrl.obtenerInicioSesionAdministrador);
autenticacionRutas.post('/empleado', AutenticacionCtrl.obtenerInicioSesionEmpleado);




export default autenticacionRutas;