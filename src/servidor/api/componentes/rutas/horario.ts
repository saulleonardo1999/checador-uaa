import {Router} from 'express';
import *  as horarioCtrl from '../controladores/horario';
const horarioRutas = Router();


/**POST */
horarioRutas.post('', horarioCtrl.crearHorario);

/**GET */
horarioRutas.get('', horarioCtrl.obtenerHorarios);
horarioRutas.get('/empresa/:id', horarioCtrl.obtenerHorariosPorEmpresa);

export default horarioRutas;