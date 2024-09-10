import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'
import {ErrorHandler} from '../errorHandlers/errorhandle'

const secret = process.env.JWT_SECRET_KEY;

declare global {
    namespace Express {
      interface Request {
        authData?: any; 
      }
    }
  }

export function auth (req:Request, res: Response, next:NextFunction){
    const token = req.headers.authorization;
    try{
        if(!token){
            return next(new ErrorHandler (401, 'Unauthorized: No token provided'))
        }

        if (!secret) {
            return next(new ErrorHandler(500, 'Internal Server Error: Secret key is not defined'));
          }
        const decoded = jwt.verify(token.split(" ")[1],secret );
        
        
        req.authData = decoded;
        next();
    }catch(error){
        return next(new ErrorHandler (403, 'Forbidden: Invalid token'))

    }
    
}
