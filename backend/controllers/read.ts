import { Request, Response } from 'express';
import userModel from "../models/userModel";

//get-all-task
export const getTask = async (req: Request, res: Response) =>{
    try{
        const tasks = await userModel.find();
        res.status(201).json(tasks)
    }catch (error){
        res.status(500).json({message:'failed to fetch task', error})
    }
}