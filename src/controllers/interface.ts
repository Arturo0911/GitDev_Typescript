import {RowDataPacket} from 'mysql2/promise';

export interface IUser {
    id?:number,
    credencials: string,
    name: string,
    lname: string,
    image: string,
    email:string,
    ocupation: string,
    account_type?: number,
    user: string,
    password: string
}
datos:{}