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
/**
 * call method database
 */
const connection_1 = require("../connection");
/**
 * instantiate a new method
 */
const localStrategy = passport_local_1.default.Strategy;
passport_1.default.initialize();
passport_1.default.session();
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
    console.log('userid ', user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * call database function
     */
    //const connecting = await connect_database();
    const connect = yield connection_1.connect_database();
    const rows = yield connect.query('SELECT * FROM users WHERE id=?', [id]);
    console.log('rows', rows[0]);
    done(undefined, rows[0]);
}));
/**
 * import data for connection file
 */
//const pass =  new Passport();
//export class PassportUser {
/*constructor (){
    this.GetDataForm();
    this.save_newUser();
    
}*/
//save_newUser(){
/*passport.use('signup_local', new localStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, async (req: Request,user, password, done )=>{*/
/**
 *
 */
/**
 * call database function
 */
//const connect = await connect_database();
/**
 * randon name to images names.
 */
//const random =  new Gen_Random();
//const foto_name =  random.RandomNumber();
/**
 * first call class to generate, then call method to generate hash
 * Generate hash to passwords
 */
//const generate = new Gen_password(req.body.password);
//const data  = await generate.encrypt();
/**
 * get data about files sended from  form signup
 */
//const path_original = req.file.path; // ubication about image
//const extension = path.extname(req.file.originalname).toLocaleLowerCase(); // extension from image
//const new_destiny = path.resolve(`src/public/img/profile/${foto_name}${extension}`); // new destiny
/**
 * here create new object to send database
 */
/*const new_user = {
    credencials:req.body.credencials,
    name:req.body.name ,
    lname:req.body.lname ,
    image: foto_name+extension,
    email:req.body.email ,
    ocupation:req.body.ocupation ,
    user:req.body.user ,
    password:data
};*/
/**
 * ESPECIFY WHAT IS THE NEW PLACE TO SAVE WE IMAGES, INCLUDING OLD PATH DESTINY AND THE NEW DESTINY
 */
/* if (extension === '.png' || extension ==='.jpg' ||
 extension === '.jpeg' || extension === '.gif'){
     fs.rename (path_original,new_destiny)
 }*/
/**
 * this section will be saved data about users to saved on mysql database,
 * so we use brcypt algorithm to hashing password
 */
//console.log('los datos a insertar',new_user );
//const resultado = await connect.query('INSERT INTO users SET ?',[new_user]);
//console.log(resultado);
//new_user.id = resultado[0].ResultSetHeader.insertId;
//return done(null,new_user);
//}));
//}
/*GetDataForm(){
    
    passport.use('local_signin', new localStrategy({
        usernameField: 'user',
        passwordField: 'password',
        passReqToCallback: true
    },async(req: Request,usuario, clave, next)=>{
        
        console.log('uusuario ', usuario);
        console.log('clave ',clave);
        //response.send('verificando');
        
    }));
}
} */
/**
 * ROUTES TO GET FORM TO SINGUP AND SIGNIN
 */
routerSignup.get('/signup', (req, res) => {
    res.render('template/signup');
});
routerSignup.get('/login', (req, res) => {
    res.render('template/signin');
});
/***
 * now verify the process
 * */
passport_1.default.use('signup_local', new localStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, (req, user, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     *
     */
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
    const generate = new passwords_1.Gen_password(req.body.password);
    const data = yield generate.encrypt();
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
        password: data
    };
    /**
     * ESPECIFY WHAT IS THE NEW PLACE TO SAVE WE IMAGES, INCLUDING OLD PATH DESTINY AND THE NEW DESTINY
     */
    if (extension === '.png' || extension === '.jpg' ||
        extension === '.jpeg' || extension === '.gif') {
        fs_extra_1.default.rename(path_original, new_destiny);
    }
    /**
     * this section will be saved data about users to saved on mysql database,
     * so we use brcypt algorithm to hashing password
     */
    //console.log('los datos a insertar',new_user );
    const resultado = yield connect.query('INSERT INTO users SET ?', [new_user]);
    console.log(resultado);
    //new_user.id = resultado[0].ResultSetHeader.insertId;
    return done(null, new_user);
})));
routerSignup.post('/signup', passport_1.default.authenticate('signup_local', {
    successRedirect: '/aut/login',
    failureRedirect: '/aut/signup',
    failureFlash: true
}));
/**
 *
 */
passport_1.default.use('local_signin', new localStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, (req, usuario, clave, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('uusuario ', usuario);
    console.log('clave ', clave);
    //response.send('verificando');
})));
routerSignup.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate('local_signin', {
        successRedirect: '/main/index',
        failureRedirect: '/aut/login',
        failureFlash: true
    })(req, res, next);
}));
exports.default = routerSignup;
