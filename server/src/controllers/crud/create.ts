import { Request, Response } from 'express';
import mongoose from 'mongoose';

const createDoc = (model: string) => async (req: Request, res: Response) => {
  try {
    const Model = mongoose.model(model);
    const doc = await Model.create(req.body);

    if (!doc)
      return res
        .status(500)
        .json({ status: 'failed', message: 'Something went wrong' });

    res.status(201).json({ status: 'success', data: doc });
  } catch (error) {
    console.log('ERROR 💥:', error);
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
};

export default createDoc;
