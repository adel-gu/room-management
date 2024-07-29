import { NextFunction, Request, Response } from 'express';
import catchErrors from '../../utils/catchErrors';

const validateAuth = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res
      .status(200)
      .json({ status: 'Success', data: { isAuthenticated: !!req.adminId } });
  },
);

export default validateAuth;
