import { Request, Response, NextFunction } from 'express';
import AppErrorHandler from '../../utils/appErrorHandler';

const setAllowedUpdateData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppErrorHandler('This route is not for updating user password', 400),
    );

  next();
};

export default setAllowedUpdateData;
