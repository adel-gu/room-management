import { Request, Response } from 'express';
import mongoose from 'mongoose';

const readAllDoc = (model: string) => async (req: Request, res: Response) => {
  try {
    const Model = mongoose.model(model);
    const docs = await Model.find();

    res.status(200).json({ status: 'success', data: docs });
  } catch (error) {
    console.log('ERROR 💥:', error);
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
};

export default readAllDoc;
