"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BD_URL = void 0;
const user = 'admin';
const password = 'JN2TXi4r4ee09fHp';
const database = "checador-uaa";
exports.BD_URL = `mongodb+srv://${user}:${password}@checadoruaa.fklmj.mongodb.net/${database}?retryWrites=true&w=majority`;
