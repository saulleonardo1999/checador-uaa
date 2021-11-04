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
exports.obtenerSuperAdmin = exports.crearSuperAdmin = void 0;
const superadministrador_model_1 = require("../modelos/superadministrador.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const globales_1 = require("../../../config/globales");
let crearSuperAdmin = (req, res) => {
    _crearSuperAdmin(new superadministrador_model_1.SuperAdministrador(req.body), res);
};
exports.crearSuperAdmin = crearSuperAdmin;
let obtenerSuperAdmin = (req, res) => {
    _obtenerSuperAdmin(req, res);
};
exports.obtenerSuperAdmin = obtenerSuperAdmin;
function _crearSuperAdmin(admin, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            admin.save((err, admin) => {
                if (err) {
                    return res.status(422).send({ titulo: 'Error al guardar', detalles: 'Ocurrio un error al guardar el superusuario, por favor intentalo de nuevo mas tarde' });
                }
                else if (admin) {
                    let token = obtenerToken(admin);
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
function _obtenerSuperAdmin(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.headers.authorization);
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            let data = obtenerDatosDelToken(token);
            res.status(200).send(data);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function obtenerToken(datosToken) {
    return jsonwebtoken_1.default.sign(datosToken.toJSON(), globales_1.SECRET_TOKEN, { expiresIn: globales_1.EXPIRACION_TOKEN });
}
function obtenerDatosDelToken(token) {
    let userData;
    jsonwebtoken_1.default.verify(token, globales_1.SECRET_TOKEN, (err, data) => {
        console.log(err);
        console.log(data);
        userData = data;
    });
    return userData;
}
