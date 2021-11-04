"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const servidor_1 = __importDefault(require("./api/servidor"));
const bd_1 = require("./config/bd");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const servidor = servidor_1.default.instance;
mongoose_1.default.connect(bd_1.BD_URL);
servidor.app.use(express_1.default.json({ limit: '10mb' }));
servidor.app.use(express_1.default.urlencoded({ limit: '10mb', extended: true }));
servidor.app.use(cors_1.default({ origin: true, credentials: true }));
servidor.inicializarServidor();
