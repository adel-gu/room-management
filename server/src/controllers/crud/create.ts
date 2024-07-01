import { Request, Response } from 'express';
import mongoose from 'mongoose';
import cloudinary from 'cloudinary';
import { ModelsEnum } from '../../utils/constants';

const createDoc = (model: string) => async (req: Request, res: Response) => {
  try {
    const Model = mongoose.model(model);
    const doc = new Model(req.body);

    if (model === ModelsEnum.Room && req.file) {
      // Upload room image file
      const file = req.file as Express.Multer.File;
      const base64Image = Buffer.from(file.buffer).toString('base64');
      const dataUrl = `data:${file.mimetype};base64,${base64Image}`;

      const uploadResponse = await cloudinary.v2.uploader.upload(dataUrl);
      doc.image = uploadResponse.url;
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
