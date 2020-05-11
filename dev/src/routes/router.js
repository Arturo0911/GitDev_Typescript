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
const express_1 = require("express");
const router = express_1.Router();
const connection_1 = require("../connection");
const controller_1 = require("../controllers/controller");
/*interface post {
    user:string;
    password:string
}*/
router.get('/', controller_1.ItsLogged, (req, res) => {
    res.send('my aplicaction is woriking :v');
    //console.log('ESTA FUNCIONANDO');
});
router.get('/code_zone', controller_1.ItsLogged, (req, res) => {
    res.render('routes/code_zone');
    //console.log('usuario', req.user);
});
/*router.get('/index', (req:Request,res:Response)=>{
    res.render('routes/index');
});*/
router.get('/index', controller_1.ItsLogged, controller_1.index_page);
router.get('/navigation', controller_1.ItsLogged, controller_1.navigation_page);
router.get('/posted', controller_1.ItsLogged, (req, res) => {
    res.render('routes/posted');
});
router.post('/posted', controller_1.ItsLogged, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const conn = yield connection_1.connect_database();
    const fullname = req.user;
    const new_insert = {
        fullname: fullname.name,
        titulos: body.titulos,
        etiqueta: body.etiqueta1 + ' ' + body.etiqueta2,
        texto: body.texto
    };
    console.log('los datos que enviarás a la base de datos: ', new_insert);
    conn.query('INSERT INTO post SET?', [new_insert]);
    req.flash('success', 'Los valores furon agregados correctamente');
    res.redirect('/main/navigation');
}));
exports.default = router;
