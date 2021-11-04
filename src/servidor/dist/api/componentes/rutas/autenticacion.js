"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacionRutas = express_1.Router();
/**GET */
autenticacionRutas.get('/usuario');
/**POST */
autenticacionRutas.post('/usuario');
exports.default = autenticacionRutas;
