import {Router} from 'express';
import *  as empleadoCtrl from '../controladores/empleado';
const empleadoRutas = Router();


/**POST */
empleadoRutas.post('', empleadoCtrl.crearEmpleado);

/**GET */
empleadoRutas.get('', empleadoCtrl.obtenerEmpleados)
empleadoRutas.get('/empresa/:id', empleadoCtrl.obtenerEmpleadosPorEmpresa)

/**PUT */
empleadoRutas.put('', empleadoCtrl.editarEmpleado)

/**DELETE */
empleadoRutas.delete('/:id', empleadoCtrl.eliminarEmpleado)

export default empleadoRutas;