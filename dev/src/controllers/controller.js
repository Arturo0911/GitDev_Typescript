"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function index_page(req, res) {
    return res.render('routes/index');
}
exports.index_page = index_page;
function navigation_page(req, res) {
    res.render('routes/navigate');
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
