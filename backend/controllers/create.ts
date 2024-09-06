import {NextFunction, Request, Response} from 'express';
import userModel from '../models/userModel'
import { ErrorHandler } from '../errorHandlers/errorhandle';

export const createUser = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const{title, description, status } = req.body

        if(!title || !description || !status){
            const cutomeError = new ErrorHandler(400, 'filled the required details before proceeding further')
            return  res.status(cutomeError.status || 500).json({
                success: false,
                message: cutomeError.msg || 'Internal Server Error',
            });
            
        }

        const NewUser = new userModel({
            title: title,
            description: description,
            status: status,
        })

        const saveUser = await NewUser.save();

        res.status(201).json({
            message:'data created sucessfully',
            task:saveUser
        })
    }
    catch(error){
        const cutomeError = new ErrorHandler(400, 'filled the required details before proceeding further')
        return  res.status(cutomeError.status || 500).json({
            success: false,
            message: cutomeError.msg || 'Internal Server Error',
        });
    }  
}