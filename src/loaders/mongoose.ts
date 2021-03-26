import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../config';

export default async (): Promise<Db> => {
  try {
    const DB = config.databaseUrl
      .replace('<username>', config.databaseUser)
      .replace('<password>', config.databasePass);

    const connection = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    return connection.connection.db;
  } catch (error) {
    throw error;
  }
};
