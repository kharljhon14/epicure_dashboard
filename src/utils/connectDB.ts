/* eslint-disable no-multi-assign */
/* eslint-disable no-console */
import mongoose from 'mongoose';

import { MONGO_URI } from './enviromentVariables';

if (!MONGO_URI) throw new Error('Please add Mongo URI in env');

const globalWithMongoose = global as typeof globalThis & { mongoose: any };

let cached = globalWithMongoose.mongoose;

if (!cached)
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };

export default async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose
      .connect(MONGO_URI, options)
      .then((mongooseConnection) => {
        console.log('connected to DB');
        return mongooseConnection;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
