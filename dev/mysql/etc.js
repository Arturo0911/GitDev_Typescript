"use strict";
//export class PassportUser {
/*constructor (){
    this.GetDataForm();
    this.save_newUser();
    
}*/
//save_newUser(){
/*passport.use('signup_local', new localStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, async (req: Request,user, password, done )=>{*/
/**
 *
 */
/**
 * call database function
 */
//const connect = await connect_database();
/**
 * randon name to images names.
 */
//const random =  new Gen_Random();
//const foto_name =  random.RandomNumber();
/**
 * first call class to generate, then call method to generate hash
 * Generate hash to passwords
 */
//const generate = new Gen_password(req.body.password);
//const data  = await generate.encrypt();
/**
 * get data about files sended from  form signup
 */
//const path_original = req.file.path; // ubication about image
//const extension = path.extname(req.file.originalname).toLocaleLowerCase(); // extension from image
//const new_destiny = path.resolve(`src/public/img/profile/${foto_name}${extension}`); // new destiny
/**
 * here create new object to send database
 */
/*const new_user = {
    credencials:req.body.credencials,
    name:req.body.name ,
    lname:req.body.lname ,
    image: foto_name+extension,
    email:req.body.email ,
    ocupation:req.body.ocupation ,
    user:req.body.user ,
    password:data
};*/
/**
 * ESPECIFY WHAT IS THE NEW PLACE TO SAVE WE IMAGES, INCLUDING OLD PATH DESTINY AND THE NEW DESTINY
 */
/* if (extension === '.png' || extension ==='.jpg' ||
 extension === '.jpeg' || extension === '.gif'){
     fs.rename (path_original,new_destiny)
 }*/
/**
 * this section will be saved data about users to saved on mysql database,
 * so we use brcypt algorithm to hashing password
 */
//console.log('los datos a insertar',new_user );
//const resultado = await connect.query('INSERT INTO users SET ?',[new_user]);
//console.log(resultado);
//new_user.id = resultado[0].ResultSetHeader.insertId;
//return done(null,new_user);
//}));
//}
/*GetDataForm(){
    
    passport.use('local_signin', new localStrategy({
        usernameField: 'user',
        passwordField: 'password',
        passReqToCallback: true
    },async(req: Request,usuario, clave, next)=>{
        
        console.log('uusuario ', usuario);
        console.log('clave ',clave);
        //response.send('verificando');
        
    }));
}
} */ 
