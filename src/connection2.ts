import { promisify } from 'util';
import mysql from 'mysql';

/**
 * using mysql insteadof mysql2 with  promisify
 */
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'GitDev2'
});
pool.getConnection((err,connection)=>{
    if(err){
        console.log('error by: ',err.code);
    }
    if(connection){
        connection.release();
    }
    console.log('connection by mysql its ok');
    return; 
});

promisify(pool.query);
export default pool;
