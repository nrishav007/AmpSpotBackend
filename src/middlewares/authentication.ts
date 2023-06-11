import { NextFunction, Request, Response } from "express";
import { VirifiError, VirifiResult, Logger, JWT } from "../utils/index";
import { UserDal } from "../modules/user/index";
import { AdminDal } from "../modules/admin/index";

class AuthenticateUser {
    constructor() {}

    async authenticate(req: Request, response: Response, next: NextFunction){
        if (!req.headers.authorization) {
            return next(new VirifiError(400, 'No authorization token sent in the request'));
          }
        
          if (!req.headers.authorization.startsWith('Bearer')) {
            return next(new VirifiError(400, 'Authorization token should be of type Bearer token'));
          }
        
          const token: string = req.headers.authorization.split(' ')[1];
          const id: any = await JWT.verifyToken(token);
          const user = await UserDal.findUserById(id);

          if(user === null){
            return next(new VirifiError(400, 'This token user not exist!!!'));
          }
          req.user = user;
          // console.log('req.user = '+req.user);
          next();
    }

    async adminAuthenticate(req: Request, response: Response, next: NextFunction){
      if (!req.headers.authorization) {
          return next(new VirifiError(400, 'No authorization token sent in the request'));
        }
      
        if (!req.headers.authorization.startsWith('Bearer')) {
          return next(new VirifiError(400, 'Authorization token should be of type Bearer token'));
        }
      
        const token: string = req.headers.authorization.split(' ')[1];
        const id: any = await JWT.verifyToken(token);
        const admin = await AdminDal.findAdminById(id);
        req.user = admin;
        // console.log('req.user = '+req.user);
        next();
  }
}

export const Authenticate = new AuthenticateUser(); 