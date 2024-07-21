import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

// Routers
import appApi from './routes/appApi';
import authApi from './routes/authApi';
import adminApi from './routes/adminApi';
import auth from './controllers/auth';
import AppErrorHandler from './utils/appErrorHandler';
import errorRequestHandler from './controllers/errors';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set cors
app.use(cors());
app.use(morgan('dev'));

// App API
app.use('/api/v1/', authApi);
app.use('/api/v1/', auth.checkAuthToken, appApi);
app.use('/api/v1', auth.checkAuthToken, adminApi);

// Catch errors route
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(
    new AppErrorHandler(`can't find ${req.originalUrl} on this server!`, 404),
  );
});

app.use(errorRequestHandler);

export default app;
