import { Request, Response } from 'express';
import userModel from '../models/userModel';

// Update a task
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const task = await userModel.findByIdAndUpdate(id, updates, { new: true });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task', error });
    }
};
