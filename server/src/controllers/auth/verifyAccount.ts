import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';

import Admin from '../../models/admin';
import setToken from './setToken';
import catchErrors from '../../utils/catchErrors';
import AppErrorHandler from '../../utils/appErrorHandler';

const verifyAccount = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token?.toString();

    const admin = await Admin.findOne({
      verificationCode: token,
      verificationCodeExpires: { $gt: Date.now() },
    }).select('+isVerified');

    if (!admin)
      return next(
        new AppErrorHandler(
          'Token is Invalid, has been used, or has expired',
          400,
        ),
      );

    admin.verificationCode = undefined;
    admin.verificationCodeExpires = undefined;
    if (!admin.isVerified) admin.isVerified = true;

    await admin.save({ validateBeforeSave: false });

    setToken(res, admin._id.toString(), 'Admin account verified successfully');
  },
);

export default verifyAccount;
