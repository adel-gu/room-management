import { Request, Response } from 'express';
import mongoose from 'mongoose';

const deleteDoc = (model: string) => async (req: Request, res: Response) => {
  try {
    const Model = mongoose.model(model);
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc)
      return res.status(404).json({
        status: 'fail',
        message: 'Document with that ID is not found',
      });

    res.status(204).json({
      status: 'success',
      data: {},
    });
  } catch (error) {
    console.log('ERROR 💥:', error);
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
};

export default deleteDoc;