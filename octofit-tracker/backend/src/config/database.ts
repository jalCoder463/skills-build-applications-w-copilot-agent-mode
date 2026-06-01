import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export const connectDatabase = async (): Promise<typeof mongoose> => {
  return mongoose.connect(MONGODB_URI);
};

export const getMongoUri = (): string => MONGODB_URI;
