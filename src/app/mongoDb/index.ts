import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import { cityModel } from './models/city.model';

mongoose.connect(connectionString);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to database');
});

const Schema = mongoose.Schema;

const citySchema = new Schema(cityModel);
const City = mongoose.model('City', citySchema);

export default City;

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
