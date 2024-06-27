import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { auth } from 'express-openid-connect';
import { config } from './middlewares/auth0/config';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(auth(config));

export default app;
