import express, {Request,Response, NextFunction, response} from 'express';
import {connect_database} from '../connection'; 
import {insertPost,revision_post} from './interface' ;
import { Sequelize, QueryTypes, DATEONLY } from 'sequelize';
const sequelize = new Sequelize('mysql://root:@localhost:3306/GitDev2');


export function index_page (req:Request, res:Response){
    return res.render('routes/index');
}

export async function navigation_page(req:Request,res:Response){
    
    const verify = await  sequelize.query('SELECT * FROM post',{ type: QueryTypes.SELECT }); 
    const conn = await  connect_database();
    const raw_data =  await conn.query('SELECT * FROM post');
    console.log('verify',verify);
    console.log('raw_data[0]',raw_data[0]);


    /**
     * 
     */

    const render_data = <insertPost>verify[0]
    console.log('render_data.id : ',render_data.fullname);
    res.render('routes/navigate', {verify:verify});
}

export function ItsLogged(req:Request,res:Response,next:NextFunction){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/aut/login') ;
}

export function ItsNotLogged(req:Request,res:Response,next:NextFunction){
    if(!req.isAuthenticated()){
        return next();
    }
    return res.redirect('/main/index') ;
}
