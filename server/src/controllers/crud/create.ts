import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ModelsEnum } from '../../utils/constants';
import uploadImg from '../../utils/uploadImage';
import catchErrors from '../../utils/catchErrors';
import AppErrorHandler from '../../utils/appErrorHandler';

const createDoc = (model: string) =>
  catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const Model = mongoose.model(model);
    req.body.tenantId = req.tenantId;
    const doc = new Model(req.body);

    if (model === ModelsEnum.Room && req.file) {
      doc.image = await uploadImg(req.file);
    }

    await doc.save();

    if (!doc)
      return next(
        new AppErrorHandler('Error occurred while creating new document', 500),
      );

    res.status(201).json({ status: 'success', data: doc });
  });

export default createDoc;
