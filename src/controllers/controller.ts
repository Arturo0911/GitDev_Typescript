import express, {Request,Response} from 'express';



export function index_page (req:Request, res:Response){
    return res.render('routes/index');
}