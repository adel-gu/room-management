import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ModelsEnum } from '../../utils/constants';
import uploadImg from '../../utils/uploadImage';
import catchErrors from '../../utils/catchErrors';
import AppErrorHandler from '../../utils/appErrorHandler';

const updateDoc = (model: string) =>
  catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const Model = mongoose.model(model);
    const doc = await Model.findOne({
      _id: req.params.id,
      tenantId: req.tenantId,
    });

    if (!doc)
      return next(
        new AppErrorHandler('Document with that ID is not found', 404),
      );

    for (const key in req.body) {
      doc[key] = req.body[key];
    }

    // Upload the file
    if (
      [`${ModelsEnum.Room}`, `${ModelsEnum.Admin}`].includes(model) &&
      req.file
    ) {
      doc.image = await uploadImg(req.file);
    }

    await doc.save({ validateModifiedOnly: true });

    res.status(200).json({
      message: 'success',
      data: doc,
    });
  });

export default updateDoc;
