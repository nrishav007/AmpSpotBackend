import jwt from 'jsonwebtoken';
require('dotenv').config();
const secret: any = process.env.JWT_SECRET;

class JWTClass {
    constructor() {}

    async createToken(id: any) {
        const token = jwt.sign({id}, secret);
        console.log(token);
        return token;
    };
    
    async verifyToken(token: string){
        const id = jwt.verify(token, secret);
        return id;
    };
}

export const JWT = new JWTClass();