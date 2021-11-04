"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cifrarPassword = void 0;
const globales_1 = require("../../../config/globales");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function obtenerToken(datosToken) {
    return jsonwebtoken_1.default.sign(datosToken.toJSON(), globales_1.SECRET_TOKEN, { expiresIn: globales_1.EXPIRACION_TOKEN });
}
exports.default = obtenerToken;
function cifrarPassword(password) {
    return "";
}
exports.cifrarPassword = cifrarPassword;
