import { NextFunction, Request, Response } from 'express';
import { ModelsEnum } from '../../utils/constants';
import catchErrors from '../../utils/catchErrors';
import AppErrorHandler from '../../utils/appErrorHandler';
import mongoose from 'mongoose';

const settingsController = {
  read: catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const Model = mongoose.model(ModelsEnum.Settings);
    const doc = await Model.findOne({
      tenantId: req.tenantId,
    });

    if (!doc)
      return next(
        new AppErrorHandler('Document with that ID is not found', 404),
      );

    res.status(201).json({ status: 'success', data: doc });
  }),

  update: catchErrors(
    async (req: Request, res: Response, next: NextFunction) => {
      const Model = mongoose.model(ModelsEnum.Settings);
      const doc = await Model.findOneAndUpdate(
        {
          tenantId: req.tenantId,
        },
        req.body,
        {
          new: true,
        },
      );

      if (!doc)
        return next(
          new AppErrorHandler('Document with that ID is not found', 404),
        );

      res.status(201).json({ status: 'success', data: doc });
    },
  ),
};

export default settingsController;
