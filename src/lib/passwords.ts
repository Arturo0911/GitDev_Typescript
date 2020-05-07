import bcryptjs from 'bcryptjs';
import { accessSync, truncateSync } from 'fs-extra';

/**
 * class to generate hash and encrypt password
 */
export async function encrypt(password: string) {
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);// only support one overload of types 
    return hash;
}

export async function MatchPass(password:string, saved_pass:string){
    try{
        return await bcryptjs.compare(password, saved_pass);
    }catch(err){
        console.log('error is for: ', err);
    }
}
/**
 * Generat a random method to generate a name for save images in our directory
 */

export class Gen_Random {
    constuctor() {
        this.RandomNumber();
    }
    RandomNumber() {
        const data: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let numeron: any = 0;
        for (let i: number = 0; i < 7; i++) {
            numeron += data.charAt(Math.floor(Math.random() * data.length));
        }
        return numeron;
    }
}