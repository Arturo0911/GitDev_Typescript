import {Router, Request,Response, response} from 'express';
const router = Router();
import {index_page,navigation_page,ItsLogged,ItsNotLogged} from '../controllers/controller';

/*interface post {
    user:string;
    password:string
}*/

router.get('/', ItsLogged,(req:Request,res:Response)=>{
    res.send('my aplicaction is woriking :v');
    //console.log('ESTA FUNCIONANDO');
});

router.get('/code_zone',ItsLogged, (req: Request, res:Response)=>{
    res.render('routes/code_zone');
    //console.log('usuario', req.user);
    
});



/*router.get('/index', (req:Request,res:Response)=>{
    res.render('routes/index');
});*/
router.get('/index',ItsLogged,index_page);


router.get('/navigation',ItsLogged, navigation_page);

router.get('/posted',ItsLogged, (req:Request,res:Response)=>{
    res.render('routes/posted');
});
router.post('/posted',ItsLogged, (req:Request, res:Response)=>{
    const body = req.body;
    console.log('body ', body);
});






export default router;
