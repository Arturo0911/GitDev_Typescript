import { Router, Request, Response, NextFunction, json } from 'express';
import passport from 'passport';
const routerSignup = Router();
import router from './router';
import PassportLocal from 'passport-local'
import { encrypt, MatchPass, Gen_Random } from '../lib/passwords';
import fs from 'fs-extra';
import path from 'path';
import { IUser } from '../controllers/interface';
import { Sequelize, QueryTypes, DATEONLY } from 'sequelize';


/**
 * call method database
 */
import { connect_database } from '../connection';
import pool from '../connection2';
import { stringify, parse } from 'querystring';
import { Json } from 'sequelize/types/lib/utils';
import { doesNotMatch } from 'assert';

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

routerSignup.get('/signup', (req: Request, res: Response) => {
    res.render('template/signup');
});
routerSignup.get('/login', (req: Request, res: Response) => {
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
    console.log('objeto que se va a insertar', new_user);

    /**
     * ESPECIFY WHAT IS THE NEW PLACE TO SAVE WE IMAGES, INCLUDING OLD PATH DESTINY AND THE NEW DESTINY
    */

    if (extension === '.png' || extension === '.jpg' ||
        extension === '.jpeg' || extension === '.gif') {
        fs.rename(path_original, new_destiny)
    }

    await connect.query('INSERT INTO users SET ?', [new_user]);
    return done(null, new_user);

}));
routerSignup.post('/signup', passport.authenticate('signup_local', {
    successRedirect: '/aut/login',
    failureRedirect: '/aut/signup',
    failureFlash: true
}));
passport.serializeUser<any, any>((user, done) => {
    done(null, user.user);
});
passport.deserializeUser(async (user, done) => {
    const connect = await connect_database();
    const rows = await connect.query('SELECT * FROM users WHERE user=?', [user]);
    done(undefined, rows[0]);
});


/**
 * after signup process will be redirect to signin
 * now we have serializaded username and password
 */

routerSignup.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local_signin', {
        successRedirect: '/main/index',
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

    console.log('conecction', conecction);
    if (conecction.length > 0) {
        const rows = <IUser>conecction[0];
        /* const new_rows = JSON.stringify(rows,null)
        console.log('new_rows',new_rows); */
        console.log('rows =',rows);
        
        const Confirm_password = await MatchPass(password, rows.password);
        console.log('rows: ', rows.password);
        if(Confirm_password){
            console.log('usuario existe');
            done(null, rows);
            
        }else{
            console.log('contraseña incorrecta');
            done(null, false);
            
        }
    }else{
        console.log('usuario incorrecto...');
        done(null,false);
        
    }


    //console.log('rows2: ', JSON.stringify(rows,null, 3)[2]);



    //console.log('rows: ',rows);





}));



export default routerSignup;