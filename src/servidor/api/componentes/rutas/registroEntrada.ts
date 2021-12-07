import {Router} from 'express';
import *  as registroEntradaCtrl from '../controladores/registroEntrada';
const registroEntradaRutas = Router();


/**POST */
registroEntradaRutas.post('', registroEntradaCtrl.crearRegistro);

/**GET */
registroEntradaRutas.get('/empleado/:id', registroEntradaCtrl.obtenerRegistrosPorEmpleado);

export default registroEntradaRutas;