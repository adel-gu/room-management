import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ModelsEnum } from '../../utils/constants';
import uploadImg from '../../utils/uploadImage';

const updateDoc = (model: string) => async (req: Request, res: Response) => {
  try {
    const Model = mongoose.model(model);
    // find document
    const doc = await Model.findById(req.params.id);

    if (!doc)
      return res.status(404).json({
        status: 'fail',
        message: 'Document with that ID is not found',
      });

    for (const key in req.body) {
      doc[key] = req.body[key];
    }

    // Validate doc
    const validationErrors = doc.validateSync();
    if (validationErrors) {
      return res.status(400).json({
        status: 'fail',
        message: validationErrors,
      });
    }

    // Upload the file
    if (model === ModelsEnum.Room && req.file) {
      doc.image = await uploadImg(req.file);
    }

    // Save after validation success
    await doc.save();

    res.status(200).json({
      message: 'success',
      data: doc,
    });
  } catch (error) {
    console.log('ERROR 💥:', error);
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
};

export default updateDoc;
