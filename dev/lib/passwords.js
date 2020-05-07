"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * class to generate hash and encrypt password
 */
class Gen_password {
    //private saved_password: string;
    constructor(pass) {
        this.pass = pass;
        this.password = pass;
        this.encrypt();
        /*this.saved_pass: String;
        this.MatchPass();*/
        //this.RandomNumber();
    }
    encrypt() {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hash = yield bcryptjs_1.default.hash(this.password, salt); // only support one overload of types 
            return hash;
        });
    }
}
exports.Gen_password = Gen_password;
/**
 * this section is for create a random number to asign to file like photo data from each  user
 */
class Gen_Random {
    constuctor() {
        this.RandomNumber();
    }
    RandomNumber() {
        const data = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let numeron = 0;
        for (let i = 0; i < 7; i++) {
            numeron += data.charAt(Math.floor(Math.random() * data.length));
        }
        return numeron;
    }
}
exports.Gen_Random = Gen_Random;
