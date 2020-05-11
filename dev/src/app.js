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
const express_1 = __importDefault(require("express")); // llamamos el tipo de dato Aplication
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const router_1 = __importDefault(require("./routes/router"));
const autentication_1 = __importDefault(require("./routes/autentication"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const multer_1 = __importDefault(require("multer"));
const connection_1 = require("./connection");
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const passport_1 = __importDefault(require("passport"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const express_session_1 = __importDefault(require("express-session"));
class App {
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
        this.port_settings();
        this.middlewares();
        this.Connecion_verify();
        this.routers();
    }
    port_settings() {
        this.app.use(express_session_1.default({
            secret: 'Arturon',
            resave: false,
            saveUninitialized: false
        }));
        this.app.set('port', this.port || process.env.PORT || 3000);
        this.app.set('views', path_1.default.join(__dirname, 'views'));
        this.app.engine('.hbs', express_handlebars_1.default({
            defaultLayout: 'main',
            layoutsDir: path_1.default.join(this.app.get('views'), 'layouts'),
            partialsDir: path_1.default.join(this.app.get('views'), 'partials'),
            extname: '.hbs'
        }));
        this.app.set('view engine', '.hbs');
        this.app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'public')));
    }
    middlewares() {
        this.app.use(connect_flash_1.default());
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(serve_favicon_1.default(__dirname + '/public/img/interface.png'));
        this.app.use(multer_1.default({
            dest: path_1.default.join(__dirname, 'public/img/img_temp')
        }).single('image'));
        this.app.use(express_1.default.json());
        this.app.use(passport_1.default.initialize()); // here initialize passport
        this.app.use(passport_1.default.session());
        this.app.use((req, res, next) => {
            this.app.locals.user = req.user;
            //console.log("req.user ",req.user);
            this.app.locals.success = req.flash('success');
            this.app.locals.messagge = req.flash('messagge');
            next();
        });
    }
    routers() {
        this.app.use('/main', router_1.default);
        this.app.use('/aut', autentication_1.default);
    }
    Connecion_verify() {
        return __awaiter(this, void 0, void 0, function* () {
            const connect = yield connection_1.connect_database();
            return connect;
        });
    }
    listening() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get('port'));
            console.log('the app is on localhost listening on port: ', this.app.get('port'));
        });
    }
}
exports.App = App;
