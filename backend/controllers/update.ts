import { Request, Response, NextFunction } from 'express';
import userModel from '../models/userModel';
import { ErrorHandler } from '../errorHandlers/errorhandle';
// Update a task
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const task = await userModel.findByIdAndUpdate(id, updates, { new: true });
        // console.log("task updated", task)

        if(!task){
            return next(new ErrorHandler(404, 'Task not found'));
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task', error });
    }
};
