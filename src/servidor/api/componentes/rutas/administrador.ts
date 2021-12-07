import {Router} from 'express';
import *  as administradorCtrl from '../controladores/administrador';
const administrdorRutas = Router();


/**POST */
administrdorRutas.post('', administradorCtrl.crearAdmin);

/**GET */
administrdorRutas.get('', administradorCtrl.obtenerAdminastradores)
administrdorRutas.get('/empresa/:id', administradorCtrl.obtenerAdminastradoresPorEmpresa)

/**PUT */
administrdorRutas.put('', administradorCtrl.editarAdministrador)

/**DELETE */
administrdorRutas.delete('/:id', administradorCtrl.eliminarAdministrador)

export default administrdorRutas;