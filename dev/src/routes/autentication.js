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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const routerSignup = express_1.Router();
const passport_local_1 = __importDefault(require("passport-local"));
const passwords_1 = require("../lib/passwords");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const controller_1 = require("../controllers/controller");
const sequelize_1 = require("sequelize");
/**
 * call method database
 */
const connection_1 = require("../connection");
/**
 * instantiate a new method
 */
const localStrategy = passport_local_1.default.Strategy;
/**
 * import data for connection file
 */
/**
 * ROUTES TO GET FORM TO SINGUP AND SIGNIN
 */
routerSignup.get('/signup', controller_1.ItsNotLogged, (req, res) => {
    res.render('template/signup');
});
routerSignup.get('/login', controller_1.ItsNotLogged, (req, res) => {
    res.render('template/signin');
});
/***
 * now verify the process
 * */
passport_1.default.use('signup_local', new localStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * call database function
     */
    const connect = yield connection_1.connect_database();
    /**
     * randon name to images names.
     */
    const random = new passwords_1.Gen_Random();
    const foto_name = random.RandomNumber();
    /**
     * first call class to generate, then call method to generate hash
     * Generate hash to passwords
     */
    const generate = yield passwords_1.encrypt(req.body.password);
    //const data  = await generate.encrypt();
    /**
     * get data about files sended from  form signup
     */
    const path_original = req.file.path; // ubication about image
    const extension = path_1.default.extname(req.file.originalname).toLocaleLowerCase(); // extension from image
    const new_destiny = path_1.default.resolve(`src/public/img/profile/${foto_name}${extension}`); // new destiny
    /**
     * here create new object to send database
     */
    const new_user = {
        credencials: req.body.credencials,
        name: req.body.name,
        lname: req.body.lname,
        image: foto_name + extension,
        email: req.body.email,
        ocupation: req.body.ocupation,
        user: req.body.user,
        password: generate
    };
    //console.log();
    /**
     * ESPECIFY WHAT IS THE NEW PLACE TO SAVE WE IMAGES, INCLUDING OLD PATH DESTINY AND THE NEW DESTINY
    */
    if (extension === '.png' || extension === '.jpg' ||
        extension === '.jpeg' || extension === '.gif') {
        fs_extra_1.default.rename(path_original, new_destiny);
    }
    const resultado = yield connect.query('INSERT INTO users SET ?', [new_user]);
    const constante = resultado[0];
    new_user.id = constante.insertId;
    return done(null, new_user);
})));
routerSignup.post('/signup', controller_1.ItsNotLogged, passport_1.default.authenticate('signup_local', {
    successRedirect: '/aut/login',
    failureRedirect: '/aut/signup',
    failureFlash: true
}));
/**
 * after signup process will be redirect to signin
 * now we have serializaded username and password
 */
routerSignup.post('/login', controller_1.ItsNotLogged, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate('local_signin', {
        successRedirect: '/main/code_zone',
        failureRedirect: '/aut/login',
        failureFlash: true
    })(req, res, next);
}));
passport_1.default.use('local_signin', new localStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, (req, user, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const sequelize = new sequelize_1.Sequelize('mysql://root:@localhost:3306/GitDev2');
    const conecction = yield sequelize.query(`SELECT * FROM users WHERE user = '${user}'`, { type: sequelize_1.QueryTypes.SELECT });
    if (conecction.length > 0) {
        const user = conecction[0];
        const Confirm_password = yield passwords_1.MatchPass(password, user.password);
        if (Confirm_password) {
            done(null, user, req.flash('success', 'bienvenido Sr.' + user.user));
        }
        else {
            done(null, false, req.flash('messagge', 'contraseña incorrecta'));
        }
    }
    else {
        return done(null, false, req.flash('messagge', 'contraseña incorrecta'));
    }
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    const sequelize = new sequelize_1.Sequelize('mysql://root:@localhost:3306/GitDev2');
    const rows2 = yield sequelize.query(`SELECT * FROM users WHERE id=${id}`, { type: sequelize_1.QueryTypes.SELECT });
    done(null, rows2[0]);
}));
routerSignup.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/aut/login');
});
exports.default = routerSignup;
