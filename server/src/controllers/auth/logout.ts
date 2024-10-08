import { Request, Response } from 'express';
import catchErrors from '../../utils/catchErrors';

const logout = catchErrors(async (req: Request, res: Response) => {
  res.clearCookie('auth_token');
  res.sendStatus(200);
});

export default logout;
