"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticacionSuperadministradorMiddleware = void 0;
const globales_1 = require("../../../config/globales");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const superadministrador_model_1 = require("../modelos/superadministrador.model");
let autenticacionSuperadministradorMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (token)
        _verificarExpiracionTokenSuperAdministrador(token, res, next);
    else
        return res.status(401).send({ titulo: 'No autorizado', detalles: 'Necesitar iniciar sesion para tener acceso' });
};
exports.autenticacionSuperadministradorMiddleware = autenticacionSuperadministradorMiddleware;
function _verificarExpiracionTokenSuperAdministrador(token, res, next) {
    jsonwebtoken_1.default.verify(token.split(' ')[1], globales_1.SECRET_TOKEN, function (err, decodificado) {
        if (err)
            return res.status(401).send({ titulo: 'Sesion expirada', detalles: 'La sesion ha expirado, por favor vuelve a iniciar sesion' });
        else {
            const usuario = decodificado;
            superadministrador_model_1.SuperAdministrador.findById(usuario._id)
                .exec((err, administrador) => {
                if (administrador) {
                    res.locals.administrador = administrador;
                    next();
                }
                else {
                    return res.status(401).send({ titulo: 'No autorizado', detalles: 'Necesitar iniciar sesion para tener acceso' });
                }
            });
        }
    });
}
