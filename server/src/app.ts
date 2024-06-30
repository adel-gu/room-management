import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from 'express-openid-connect';
import { config } from './middlewares/auth0/config';

// Routers
import appApi from './routes/appApi';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(auth(config));

// Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// App API
app.use('/api/v1/', appApi);
export default app;
