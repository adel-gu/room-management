import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import Admin from '../../models/admin';

import catchErrors from '../../utils/catchErrors';
import AppErrorHandler from '../../utils/appErrorHandler';

const validateAuth = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res
      .status(200)
      .json({ status: 'Success', data: { isAuthenticated: !!req.adminId } });
  },
);

export default validateAuth;
