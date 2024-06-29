import mongoose from 'mongoose';
import 'dotenv/config';
import app from './app';
import loadSchemas from './utils/loadSchemas';

const PORT = process.env.PORT || 3000;
const DB_STRING_URI = process.env.DB_STRING_URI as string;

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_STRING_URI);
    await loadSchemas();
    console.log('Successfully connected to MongoDB! 🚀');
  } catch (error) {
    console.log('ERROR 💥: ', error);
  }
};

connectToDB().then(() =>
  app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
  }),
);
