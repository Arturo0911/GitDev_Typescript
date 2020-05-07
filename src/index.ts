import express  from'express';
import {App} from './app';

 
async function main(){
    const app =  new App();
    await app.listening();
    app.middlewares();
    
}

main();