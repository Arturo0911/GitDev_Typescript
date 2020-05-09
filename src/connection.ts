import { createPool } from 'mysql2/promise';



/**
 * using mysql2/promise
 */
export async function connect_database() {
    const connect = await createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'GitDev2',
        connectionLimit: 10
    });
    if (connect) {
        console.log('connection with databse is successfuly');

    }

    //connect.query =  promisify(connect.query);
    return connect;
}

export interface database_credencials {
    
}
