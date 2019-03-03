import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import { moveDataToMongoDb } from './helpers/moveDataToMongoDb';
import { Product, User } from './models';

const connectionString =
    'mongodb+srv://mongoUser:111@cluster0-syndd.mongodb.net/homework-07?retryWrites=true';

mongoose.connect(connectionString, { useNewUrlParser: true });

export const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to database');
    moveDataToMongoDb({
        Product,
        User,
    })
        .then(() => {
            console.log('Data moved');
        });
});

/*
--- MongoDB native driver

export const connectToMongoDb = () => {

  return MongoClient.connect(
       connectionString,
       { useNewUrlParser: true })
       .then((client: MongoClient) => {
           const database = client.db('homework-07');
           return database;
       })
       .catch((error: Error) => error);
};*/
