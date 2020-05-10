"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
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
router.post('/posted', controller_1.ItsLogged, (req, res) => {
    const body = req.body;
    console.log('body ', body);
});
exports.default = router;
