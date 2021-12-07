import {Router} from 'express';
import *  as registroSalidaCtrl from '../controladores/registroSalida';
const registroSalidaRutas = Router();


/**POST */
registroSalidaRutas.post('', registroSalidaCtrl.crearRegistro);

/**GET */
registroSalidaRutas.get('/empleado/:id', registroSalidaCtrl.obtenerRegistrosPorEmpleado);

export default registroSalidaRutas;