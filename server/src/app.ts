import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Test Route
app.get('/test', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Route successfully accessed' });
});

export default app;
