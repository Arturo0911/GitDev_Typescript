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
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('mysql://root:@localhost:3306/GitDev2');
function index_page(req, res) {
    return res.render('routes/index');
}
exports.index_page = index_page;
function navigation_page(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const verify = yield sequelize.query('SELECT * FROM post', { type: sequelize_1.QueryTypes.SELECT });
        const render_data = verify[0];
        console.log('render_data.id : ', render_data.fullname);
        res.render('routes/navigate', { values: render_data });
    });
}
exports.navigation_page = navigation_page;
function ItsLogged(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/aut/login');
}
exports.ItsLogged = ItsLogged;
function ItsNotLogged(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/main/index');
}
exports.ItsNotLogged = ItsNotLogged;
