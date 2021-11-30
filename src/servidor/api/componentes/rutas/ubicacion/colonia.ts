import {Router} from 'express';
import *  as coloniasCtrl from '../../controladores/ubicacion/colonia';
const coloniaRutas = Router();

/**GET */
coloniaRutas.get('', coloniasCtrl.obtenerColonias)

export default coloniaRutas;