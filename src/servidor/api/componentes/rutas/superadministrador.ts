import {Router} from 'express';
import *  as SuperadministradorCtrl from '../controladores/superadministrador';
const superadministrdorRutas = Router();


/**POST */
superadministrdorRutas.post('', SuperadministradorCtrl.crearSuperAdmin);




export default superadministrdorRutas;