import { Request, Response } from 'express';
import userModel from "../models/userModel";

export const deleteUser= async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userModel.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message:'user not found'})
        }
        res.status(200).json({message:'data deleted successfully'})
    } catch (error) {
        res.status(405004).json({message:'failed to delete user',error })
    }

}