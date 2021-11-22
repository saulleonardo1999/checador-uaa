import {Router} from 'express';
import *  as SuperadministradorCtrl from '../controladores/superadministrador';
const superadministrdorRutas = Router();


/**POST */
superadministrdorRutas.post('', SuperadministradorCtrl.crearSuperAdmin);

/**GET */
superadministrdorRutas.get('', SuperadministradorCtrl.obtenerSuperAdminastradores)

/**PUT */
superadministrdorRutas.put('', SuperadministradorCtrl.editarSuperAdministrador)

/**DELETE */
superadministrdorRutas.delete('/:id', SuperadministradorCtrl.eliminarSuperAdministrador)

export default superadministrdorRutas;