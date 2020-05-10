import { Router, Request, Response, NextFunction, json } from 'express';
import passport from 'passport';
const routerSignup = Router();
import router from './router';
import PassportLocal from 'passport-local'
import { encrypt, MatchPass, Gen_Random } from '../lib/passwords';
import fs from 'fs-extra';
import path from 'path';
import { IUser,ResultSetheader_data } from '../controllers/interface';
import {ItsLogged,ItsNotLogged} from  '../controllers/controller';
import { Sequelize, QueryTypes, DATEONLY } from 'sequelize';


/**
 * call method database
 */
import { connect_database } from '../connection';
import pool from '../connection2';
import { stringify, parse } from 'querystring';
import { Json } from 'sequelize/types/lib/utils';
import { doesNotMatch } from 'assert';
import { userInfo } from 'os';

/**
 * instantiate a new method
 */
const localStrategy = PassportLocal.Strategy;


/**
 * import data for connection file
 */

/**
 * ROUTES TO GET FORM TO SINGUP AND SIGNIN
 */

routerSignup.get('/signup',ItsNotLogged, (req: Request, res: Response) => {
    res.render('template/signup');
});
routerSignup.get('/login', ItsNotLogged,(req: Request, res: Response) => {
    res.render('template/signin');
});


/***
 * now verify the process
 * */
passport.use('signup_local', new localStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, async (req: Request, username, password, done) => {

    /**
     * call database function
     */
    const connect = await connect_database();

    /**
     * randon name to images names.
     */
    const random = new Gen_Random();
    const foto_name = random.RandomNumber();

    /**
     * first call class to generate, then call method to generate hash
     * Generate hash to passwords
     */
    const generate = await encrypt(req.body.password);
    //const data  = await generate.encrypt();

    /**
     * get data about files sended from  form signup
     */
    const path_original = req.file.path; // ubication about image
    const extension = path.extname(req.file.originalname).toLocaleLowerCase(); // extension from image
    const new_destiny = path.resolve(`src/public/img/profile/${foto_name}${extension}`); // new destiny

    /**
     * here create new object to send database
     */

    const new_user:IUser = {
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
        fs.rename(path_original, new_destiny)
    }

    const resultado = await connect.query('INSERT INTO users SET ?', [new_user]);
    const constante = <ResultSetheader_data> resultado[0];
    new_user.id = constante.insertId;
    return done(null, new_user);

}));
routerSignup.post('/signup',ItsNotLogged, passport.authenticate('signup_local', {
    successRedirect: '/aut/login',
    failureRedirect: '/aut/signup',
    failureFlash: true
}));



/**
 * after signup process will be redirect to signin
 * now we have serializaded username and password
 */

routerSignup.post('/login',ItsNotLogged, async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local_signin', {
        successRedirect: '/main/code_zone',
        failureRedirect: '/aut/login',
        failureFlash: true
    })(req, res, next)
});
passport.use('local_signin', new localStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, async (req: Request, user, password, done) => {
    const sequelize = new Sequelize('mysql://root:@localhost:3306/GitDev2');
    const conecction = await sequelize.query(`SELECT * FROM users WHERE user = '${user}'`, { type: QueryTypes.SELECT });

    if (conecction.length > 0) {
        const user = <IUser>conecction[0];  
        const Confirm_password = await MatchPass(password, user.password);
        if(Confirm_password){
            
            done(null, user, req.flash('success','bienvenido Sr.'+user.user));
            
        }else{
            
            done(null, false, req.flash('messagge','contraseña incorrecta'));
            
        }
    }else{
       
        return done(null,false,req.flash('messagge','contraseña incorrecta'));
        
    }

}));

passport.serializeUser<any, any>((user, done) => {
    done(null, user.id);
});
passport.deserializeUser<any,any>(async (id, done) => {
    const sequelize = new Sequelize('mysql://root:@localhost:3306/GitDev2');
    const rows2 = await sequelize.query(`SELECT * FROM users WHERE id=${id}`,{ type: QueryTypes.SELECT });
    done(null, rows2[0]);
});


routerSignup.get('/logout', (req:Request,res:Response)=>{
    req.logOut();
    res.redirect('/aut/login');
});


export default routerSignup;