import { NextFunction, Request, Response } from 'express';
import Admin from '../../models/admin';
import setToken from './setToken';
import catchErrors from '../../utils/catchErrors';
import AppErrorHandler from '../../utils/appErrorHandler';

const login = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select(
      '+password +salt +isVerified',
    );
    if (
      !admin ||
      !(await admin.checkIsPasswordCorrect(password, admin.password))
    )
      return next(new AppErrorHandler('Invalid credentials', 401));

    if (!admin.isVerified)
      return next(
        new AppErrorHandler(
          'Account is not verified. Please check your email for verification link.',
          401,
        ),
      );

    setToken(res, admin._id.toString(), 'user logged in successfully');
  },
);

export default login;
