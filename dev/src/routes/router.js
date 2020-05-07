"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const controller_1 = require("../controllers/controller");
/*interface post {
    user:string;
    password:string
}*/
router.get('/', (req, res) => {
    res.send('my aplicaction is woriking :v');
    console.log('ESTA FUNCIONANDO');
});
/*router.get('/index', (req:Request,res:Response)=>{
    res.render('routes/index');
});*/
router.get('/index', controller_1.index_page);
exports.default = router;
