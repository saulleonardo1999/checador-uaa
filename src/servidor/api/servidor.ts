import  express from 'express';
import  http from 'http';
import { OPCIONES, PUERTO_SERVIDOR } from '../config/globales';
import administrdorRutas from './componentes/rutas/administrador';
import alumnoRutas from './componentes/rutas/alumno.route';
import autenticacionRutas from './componentes/rutas/autenticacion';
import empleadoRutas from './componentes/rutas/empleado';
import empresaRutas from './componentes/rutas/empresa';
import horarioRutas from './componentes/rutas/horario';
import horarioTrabajadoRutas from './componentes/rutas/horarioTrabajado';
import materiaRutas from './componentes/rutas/materia.route';
import profesorRutas from './componentes/rutas/profesor.route';
import registroEntradaRutas from './componentes/rutas/registroEntrada';
import registroSalidaRutas from './componentes/rutas/registroSalida';
import superadministrdorRutas from './componentes/rutas/superadministrador';
import suscripcionRutas from './componentes/rutas/suscripcion';
import codigoPostalRutas from './componentes/rutas/ubicacion/codigoPostal';
import coloniaRutas from './componentes/rutas/ubicacion/colonia';

export default class Servidor {
    private static _instance: Servidor;
    public app: express.Application;
    public puerto : number;
    private servidorHttp: http.Server;
    private constructor (){
        this.app = express();
        this.puerto = PUERTO_SERVIDOR;
        this.servidorHttp = new http.Server(OPCIONES, this.app);
    }
    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    private inicializarRutas(){
        this.app.use('/api/v1/autenticacion', autenticacionRutas);
        this.app.use('/api/v1/superadministrador', superadministrdorRutas);
        this.app.use('/api/v1/codigo-postal', codigoPostalRutas);
        this.app.use('/api/v1/colonia', coloniaRutas);
        this.app.use('/api/v1/empresa', empresaRutas);
        this.app.use('/api/v1/administrador', administrdorRutas);
        this.app.use('/api/v1/empleado', empleadoRutas);
        this.app.use('/api/v1/horario', horarioRutas);
        this.app.use('/api/v1/suscripcion', suscripcionRutas);
        this.app.use('/api/v1/registro-entrada', registroEntradaRutas);
        this.app.use('/api/v1/registro-salida', registroSalidaRutas);
        this.app.use('/api/v1/horario-trabajado', horarioTrabajadoRutas);
        this.app.use('/api/v1/profesor', profesorRutas);
        this.app.use('/api/v1/alumno', alumnoRutas);
        this.app.use('/api/v1/materia', materiaRutas);
    }
    public async inicializarServidor(){
        this.inicializarRutas();
        this.servidorHttp.listen(this.puerto, ()=>{
            console.log(`Servidor activo en el puerto ${this.puerto}`)
        })
    }
}