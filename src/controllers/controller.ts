import express, {Request,Response, NextFunction} from 'express';



export function index_page (req:Request, res:Response){
    return res.render('routes/index');
}

export function navigation_page(req:Request,res:Response){
    res.render('routes/navigate');
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
