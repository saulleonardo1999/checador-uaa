import {Router} from 'express';
import *  as EmpresaCtrl from '../controladores/empresa';
const empresaRutas = Router();


/**POST */
empresaRutas.post('', EmpresaCtrl.guardarEmpresa);

/**GET */
empresaRutas.get('', EmpresaCtrl.obtenerEmpresas)

/**PUT */
empresaRutas.put('', EmpresaCtrl.editarEmpresa)

/**DELETE */
empresaRutas.delete('/:id', EmpresaCtrl.eliminarEmpresa)

export default empresaRutas;