import {Request, Response} from 'express';
import userModel from '../models/userModel'

export const createUser = async (req:Request, res:Response) => {
    try{
        const{title, description, status } = req.body

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
        res.status(403).json({
            Message:'forbidden', error
        })
    }  
}