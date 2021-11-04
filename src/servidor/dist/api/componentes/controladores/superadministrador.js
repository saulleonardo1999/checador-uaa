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
exports.crearSuperAdmin = void 0;
const superadministrador_model_1 = require("../modelos/superadministrador.model");
const autenticacion_1 = __importDefault(require("./autenticacion"));
let crearSuperAdmin = (req, res) => {
    _crearSuperAdmin(new superadministrador_model_1.SuperAdministrador(req.body), res);
};
exports.crearSuperAdmin = crearSuperAdmin;
function _crearSuperAdmin(admin, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            admin.save((err, admin) => {
                if (err) {
                    return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar el superusuario, por favor intentalo de nuevo mas tarde' });
                }
                else if (admin) {
                    let token = autenticacion_1.default(admin);
                    return res.status(201).json({ token: token });
                }
                else {
                    return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar el superusuario, por favor intentalo de nuevo mas tarde' });
                }
            });
        }
        catch (error) {
        }
    });
}
