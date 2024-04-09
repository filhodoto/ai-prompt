import mongoose from 'mongoose';

let isConnected = true;
const dbUrl = '';
export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB already connected');
    return;
  }

  try {
    await mongoose.connect(dbUrl, {
      dbName: 'test',
    });
    isConnected = true;
    console.log('MongoDB Connected >>');
  } catch (error) {
    console.log('Error connecting to Database >> ', error);
  }
};
