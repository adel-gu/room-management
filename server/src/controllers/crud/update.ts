import { Request, Response } from 'express';
import mongoose from 'mongoose';

const updateDoc = (model: string) => async (req: Request, res: Response) => {
  try {
    const Model = mongoose.model(model);
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc)
      return res.status(404).json({
        status: 'fail',
        message: 'Document with that ID is not found',
      });

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  } catch (error) {
    console.log('ERROR 💥:', error);
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
};

export default updateDoc;
