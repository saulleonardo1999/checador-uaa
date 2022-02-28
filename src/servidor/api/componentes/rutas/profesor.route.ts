import {Router} from 'express';
import *  as ProfesorCtrl from '../controladores/profesor.controller';
const profesorRutas = Router();


/**POST */
profesorRutas.post('', ProfesorCtrl.crearProfesor);

/**GET */
profesorRutas.get('', ProfesorCtrl.obtenerProfesores)

/**PUT */
profesorRutas.put('', ProfesorCtrl.editarProfesor)

/**DELETE */
profesorRutas.delete('/:id', ProfesorCtrl.eliminarProfesor)

export default profesorRutas;