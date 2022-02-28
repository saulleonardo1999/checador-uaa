import {Router} from 'express';
import *  as AlumnoCtrl from '../controladores/alumno.controller';
const alumnoRutas = Router();


/**POST */
alumnoRutas.post('', AlumnoCtrl.crearAlumno);

/**GET */
alumnoRutas.get('', AlumnoCtrl.obtenerAlumnos)

/**PUT */
alumnoRutas.put('', AlumnoCtrl.editarAlumno)

/**DELETE */
alumnoRutas.delete('/:id', AlumnoCtrl.eliminarAlumno)

export default alumnoRutas;