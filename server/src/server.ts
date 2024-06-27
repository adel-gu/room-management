import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 3000;
const DB_STRING_URI = process.env.DB_STRING_URI as string;

const client = new MongoClient(DB_STRING_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectToDB = async () => {
  try {
    await client.connect();
    await client.db().command({ ping: 1 });
    console.log('Successfully connected to MongoDB! 🚀');
  } catch (error) {
    console.log('ERROR 💥: ', error);
  } finally {
    await client.close();
  }
};

connectToDB().finally(() =>
  app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
  }),
);
