import {Router} from 'express';
import *  as MateriaCtrl from '../controladores/materia.controller';
const materiaRutas = Router();


/**POST */
materiaRutas.post('', MateriaCtrl.crearMateria);

/**GET */
materiaRutas.get('', MateriaCtrl.obtenerMaterias)

/**PUT */
materiaRutas.put('', MateriaCtrl.editarMateria)

/**DELETE */
materiaRutas.delete('/:id', MateriaCtrl.eliminarMateria)

export default materiaRutas;