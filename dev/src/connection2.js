"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const mysql_1 = __importDefault(require("mysql"));
/**
 * using mysql insteadof mysql2 with  promisify
 */
const pool = mysql_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'GitDev2'
});
pool.getConnection((err, connection) => {
    if (err) {
        console.log('error by: ', err.code);
    }
    if (connection) {
        connection.release();
    }
    console.log('connection by mysql its ok');
    return;
});
util_1.promisify(pool.query);
exports.default = pool;
