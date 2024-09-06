import { Request, Response, NextFunction } from 'express';
import userModel from "../models/userModel";
import { ErrorHandler } from '../errorHandlers/errorhandle';

export const deleteUser= async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { id } = req.params;
        const result = await userModel.findByIdAndDelete(id);

        if(!result){
            return next(new ErrorHandler (404, 'User not Found'))
        }
        res.status(200).json({message:'data deleted successfully'})
    } catch (error) {
        res.status(404).json({message:'failed to delete user',error })
    }

}