import { RowDataPacket } from 'mysql2/promise';
import { DatabaseError } from 'sequelize/types';

export interface insertPost {
    id?: number,
    fullname ?:string | any,
    titulos?:string,
    etiqueta?:string,
    texto?:string,
    estado?:string
}


export interface IUser {
    id?: number,
    credencials: string,
    name: string,
    lname: string,
    image: string,
    email: string,
    ocupation: string,
    account_type?: number,
    user: string,
    password: string
}

export interface ResultSetheader_data {
    fieldCount?: number,
    affectedRows?: number,
    insertId?: number,
    info?: number,
    serverStatus?: number,
    warningStatus?: number

}

export interface connect {
    host?: string,
    user?: string,
    password?: string,
    database?: string
}

export const database = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'GitDev2'
}

export interface revision_post {
    id ?: number,
    watch_user ?:string | any,
    vistas ?:number,
    id_post_posted ?:number,
}
