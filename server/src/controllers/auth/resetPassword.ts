import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import Admin from '../../models/admin';
import setToken from './setToken';
import catchErrors from '../../utils/catchErrors';
import AppErrorHandler from '../../utils/appErrorHandler';

const resetPassword = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const admin = await Admin.findOne({
      passwordToken: hashedToken,
      passwordTokenExpires: { $gt: Date.now() },
    });

    if (!admin)
      return next(new AppErrorHandler('Token is Invalid or has expired', 400));

    admin.password = req.body.password;
    admin.passwordConfirm = req.body.passwordConfirm;
    admin.passwordToken = undefined;
    admin.passwordTokenExpires = undefined;

    await admin.save();

    setToken(res, admin._id.toString(), 'Password reset successfully!');
  },
);

export default resetPassword;
