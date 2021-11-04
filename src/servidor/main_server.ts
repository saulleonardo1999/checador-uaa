import Servidor from "./api/servidor";
import { BD_URL } from "./config/bd";
import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
const servidor = Servidor.instance;
mongoose.connect(BD_URL);

servidor.app.use(express.json({ limit: '10mb' }));
servidor.app.use(express.urlencoded({ limit: '10mb', extended: true }));
servidor.app.use(cors({origin:true, credentials: true}));
servidor.inicializarServidor();