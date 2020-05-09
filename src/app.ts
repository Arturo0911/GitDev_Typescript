import express, {Application, Request, Response, NextFunction} from'express'; // llamamos el tipo de dato Aplication
import morgan from 'morgan';
import path from 'path';
import router from './routes/router'
import routerSignup from './routes/autentication'
import  handlebars from 'express-handlebars';
import multer from 'multer';
import {connect_database} from './connection';
import favicon from 'serve-favicon';
import passport from 'passport';
import flash from 'connect-flash';
import session from 'express-session' ;
import * as Passportconfig from './routes/autentication';
import MySQLStore from  'express-mysql-session' ;
import {Sequelize} from 'sequelize';
import {IUser,connect,database} from './controllers/interface';
//const session_stor = MySQLStore(session);


export class App {

    private app: Application;

    constructor (private port?: number| string){ 
        //Passportconfig;
        
        this.app = express();
        this.port_settings();
        this.middlewares();
        this.Connecion_verify ();
        this.routers();
        //this.Global_variables();

    }

    port_settings(){
        this.app.use(session({
            secret: 'Arturon',
            resave:false,
            saveUninitialized: false
        }));
        this.app.set('port', this.port || process.env.PORT || 3000);
        this.app.set('views',path.join(__dirname, 'views'));
        this.app.engine('.hbs',handlebars({
            defaultLayout: 'main',
            layoutsDir: path.join(this.app.get('views'), 'layouts') ,
            partialsDir:path.join(this.app.get('views'),'partials') , 
            extname: '.hbs'

        }));
        this.app.set('view engine', '.hbs');
        this.app.use('/public',express.static(path.join(__dirname, 'public'))); // espcificamos las carpetas publicas
    }

    middlewares(){
        
        
        this.app.use(flash());
        
        //serialPassporrt.save_newUser();
        //this.app.use();
        //Passportconfig;
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(favicon(__dirname+ '/public/img/interface.png'));
        this.app.use(multer({ // to set images on public folder
            dest: path.join(__dirname, 'public/img/img_temp')
        }).single('image'));
        this.app.use(express.json());
        this.app.use(passport.initialize()); // here initialize passport
        this.app.use(passport.session());
        this.app.use((req, res, next)=>{
            this.app.locals.user =  req.user;
            //console.log("req.user ",req.user);
            this.app.locals.success =  req.flash('success');
            this.app.locals.messagge =  req.flash('messagge');
            next();
        });
        
        
        //Passportconfig;
        
        
    }
    routers(){
        this.app.use('/main',router);
        this.app.use('/aut',routerSignup);
        
    }
    /*Global_variables(){
        this.app.use((req, res, next)=>{
            this.app.locals.user =  req.user;
            console.log("req.user ",req.user);
            
            this.app.locals.success =  req.flash('success');
            this.app.locals.messagge =  req.flash('messagge');
            next();
        });
    }*/
    async Connecion_verify (){
        const connect =  await connect_database();
        return connect;
    }
    // aqui definiremos el proceso asincrono de estcuchar el puerto.
    async listening (){
        await this.app.listen(this.app.get('port'));
        console.log('the app is on localhost listening on port: ', this.app.get('port'));
    }
}