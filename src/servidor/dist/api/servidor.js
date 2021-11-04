"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const globales_1 = require("../config/globales");
const autenticacion_1 = __importDefault(require("./componentes/rutas/autenticacion"));
class Servidor {
    constructor() {
        this.app = express_1.default();
        this.puerto = globales_1.PUERTO_SERVIDOR;
        this.servidorHttp = new http_1.default.Server(globales_1.OPCIONES, this.app);
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    inicializarRutas() {
        this.app.use('/api/v1/autenticacion', autenticacion_1.default);
    }
    inicializarServidor() {
        return __awaiter(this, void 0, void 0, function* () {
            this.inicializarRutas();
            this.servidorHttp.listen(this.puerto, () => {
                console.log(`Servidor activo en el puerto ${this.puerto}`);
            });
        });
    }
}
exports.default = Servidor;
