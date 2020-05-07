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
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
function connect_database() {
    return __awaiter(this, void 0, void 0, function* () {
        const connect = yield promise_1.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'GitDev',
            connectionLimit: 10
        });
        if (connect) {
            console.log('connection with databse is successfuly');
        }
        return connect;
    });
}
exports.connect_database = connect_database;
