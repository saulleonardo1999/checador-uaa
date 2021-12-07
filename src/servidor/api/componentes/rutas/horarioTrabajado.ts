import {Router} from 'express';
import *  as horarioTrabajadoCtrl from '../controladores/horarioTrabajado';
const horarioTrabajadoRutas = Router();


/**POST */
horarioTrabajadoRutas.post('', horarioTrabajadoCtrl.crearHorarioTrabajado);

/**GET */
horarioTrabajadoRutas.get('/empleado/:id', horarioTrabajadoCtrl.obtenerHorariosTrabajadosPorEmpleado);

export default horarioTrabajadoRutas;