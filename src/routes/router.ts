import {Router, Request,Response, response} from 'express';
const router = Router();
import {connect_database} from '../connection';
import {insertPost,IUser,revision_post} from '../controllers/interface';
import {index_page,navigation_page,ItsLogged,ItsNotLogged} from '../controllers/controller';
import { Sequelize, QueryTypes, DATEONLY } from 'sequelize';
const sequelize = new Sequelize('mysql://root:@localhost:3306/GitDev2');

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
router.post('/posted',ItsLogged, async(req:Request, res:Response)=>{
    const body = req.body;
    const conn =   await connect_database();
    const fullname = <IUser> req.user;
    const new_insert:insertPost = {
        fullname: fullname.name ,
        titulos: body.titulos ,
        etiqueta: body.etiqueta1 +' '+ body.etiqueta2,
        texto: body.texto
    };
    conn.query('INSERT INTO post SET?',[new_insert]);
    req.flash('success', 'Los valores furon agregados correctamente');
    res.redirect('/main/navigation');
});

router.get('/verify_post/:id', async(req:Request,res:Response)=>{
    const conn = await connect_database();
    const parametro =  req.params;
    const fullname = <IUser> req.user

    console.log('parametro', parametro.id);
    
    const object:revision_post = {
        watch_user: fullname.name,
        id_post_posted:parseInt(parametro.id)
    };
    const firs_query = await conn.query(`INSERT INTO revisiones_post set?`,[object]);
    req.flash('success', 'hecho');
    res.redirect('/main/index')
    //const connectiion =  await sequelize.query(`SELECT * FROM `)
});






export default router;
