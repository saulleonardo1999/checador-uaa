import {Router} from 'express';
import *  as codigoPostalCtrl from '../../controladores/ubicacion/codigoPostal';
const codigoPostalRutas = Router();

/**GET */
codigoPostalRutas.get('/:cp', codigoPostalCtrl.obtenerCodigosPostales)

export default codigoPostalRutas;