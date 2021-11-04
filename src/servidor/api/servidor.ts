import  express from 'express';
import  http from 'http';
import { OPCIONES, PUERTO_SERVIDOR } from '../config/globales';
import autenticacionRutas from './componentes/rutas/autenticacion';
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
        this.app.use('/api/v1/superadministradores', autenticacionRutas);
    }
    public async inicializarServidor(){
        this.inicializarRutas();
        this.servidorHttp.listen(this.puerto, ()=>{
            console.log(`Servidor activo en el puerto ${this.puerto}`)
        })
    }
}