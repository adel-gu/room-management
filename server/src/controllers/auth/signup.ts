import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import Admin from '../../models/admin';
import Email from '../../services/email';
import catchErrors from '../../utils/catchErrors';
import AppErrorHandler from '../../utils/appErrorHandler';

const signup = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, passwordConfirm } = req.body;
    const existedAdmin = await Admin.findOne({ email });

    if (existedAdmin)
      return next(
        new AppErrorHandler(
          'This account is already exist. Please try to login instead',
          409,
        ),
      );

    const admin = new Admin({
      name,
      email,
      password,
      passwordConfirm,
      tenantId: new mongoose.Types.ObjectId(),
    });

    const token = admin.generateVerificationToken();
    await admin.save();

    try {
      await new Email({ name, email }, token).sendEmailVerification();
    } catch (error) {
      return next(
        new AppErrorHandler(
          'There was an error while sending the verify account email',
          500,
        ),
      );
    }

    res.status(201).json({
      status: 'Success',
      message: 'A verification account link was sent to your email',
    });
  },
);

export default signup;
