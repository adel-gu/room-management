import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ModelsEnum } from '../../utils/constants';
import uploadImg from '../../utils/uploadImage';

const createDoc = (model: string) => async (req: Request, res: Response) => {
  try {
    const Model = mongoose.model(model);
    const doc = new Model(req.body);

    if (model === ModelsEnum.Room && req.file) {
      doc.image = await uploadImg(req.file);
    }

    await doc.save();

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
