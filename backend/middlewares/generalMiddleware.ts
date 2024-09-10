import {Request, Response, NextFunction} from 'express';

export function loggerMiddleware (req:Request, res:Response, next:NextFunction){
    const {method, path, hostname} = req;
    console.log(req.body)
    const time = new Date(Date.now()).toString();
    console.log("*****************************");
    console.log(`Request method - ${method}, Requested path - ${path}, Hostname - ${hostname}, Current Time- ${time}`);
    next();
}