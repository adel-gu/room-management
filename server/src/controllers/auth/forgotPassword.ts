import { NextFunction, Request, Response } from 'express';
import Admin from '../../models/admin';
import Email from '../../services/email';
import catchErrors from '../../utils/catchErrors';
import AppErrorHandler from '../../utils/appErrorHandler';

const forgotPassword = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email)
      return next(new AppErrorHandler('Please provide your email', 404));

    const admin = await Admin.findOne({ email });

    if (!admin)
      return next(new AppErrorHandler('No user associated to that email', 404));

    const resetToken = admin.generateToken();
    await admin.save({ validateBeforeSave: false });
    const resetURL = `${req.protocol}://${req.get(
      'host',
    )}/api/v1/reset-password/${resetToken}`;

    try {
      const email = new Email(
        { name: admin.name, email: admin.email },
        resetURL,
      );
      await email.sendResetPassword();
    } catch (error) {
      admin.passwordToken = undefined;
      admin.passwordTokenExpires = undefined;
      await admin.save({ validateBeforeSave: false });
      return next(
        new AppErrorHandler(
          'There was an error while sending the reset token email',
          500,
        ),
      );
    }

    res.status(200).json({ status: 'success', message: 'Token sent to email' });
  },
);

export default forgotPassword;
