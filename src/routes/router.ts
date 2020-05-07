import {Router, Request,Response, response} from 'express';
const router = Router();
import {index_page} from '../controllers/controller';

/*interface post {
    user:string;
    password:string
}*/

router.get('/', (req:Request,res:Response)=>{
    res.send('my aplicaction is woriking :v');
    console.log('ESTA FUNCIONANDO');
    
});



/*router.get('/index', (req:Request,res:Response)=>{
    res.render('routes/index');
});*/
router.get('/index',index_page);



export default router;
