import {Router} from 'express';
import *  as suscripcionCtrl from '../controladores/suscripcion';
const suscripcionRutas = Router();


/**POST */
suscripcionRutas.post('', suscripcionCtrl.crearSuscripcion);

/**GET */
suscripcionRutas.get('', suscripcionCtrl.obtenerSuscripciones)
suscripcionRutas.get('/empresa/:id', suscripcionCtrl.obtenerSuscripcionesPorEmpresa)
/**PUT */
suscripcionRutas.put('', suscripcionCtrl.editarSuscripcion)

export default suscripcionRutas;