import { Request, Response } from 'express';
import userModel from '../models/userModel'; 

export const getTask = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;

    const tasks = await userModel.find()
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit);

    const totalDocuments = await userModel.countDocuments();

    res.status(200).json({
      data: tasks,
      currentPage: page,
      totalPages: Math.ceil(totalDocuments / limit),
      totalDocuments,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching tasks' });
  }
};

export const updateBulkTask = async (req: Request, res: Response) => {
  try {
    const { filter, updateFields } = req.body;

    if (!filter || !updateFields) {
      return res.status(400).json({ error: 'Filter and updateFields are required' });
    }

    const result = await userModel.updateMany(filter, updateFields);

    res.status(200).json({
      modifiedCount: result.modifiedCount,
      message: `${result.modifiedCount} tasks were updated successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during the bulk update' });
  }
};
