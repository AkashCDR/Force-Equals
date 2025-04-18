import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('db connected');
  } catch (error) {
    console.error('db connection error', error);
    process.exit(1);
  }
};

export default connectDB;