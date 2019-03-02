import { MongoClient } from 'mongodb';

export const connectToMongoDb = () => {
    return MongoClient.connect(
        connectionString,
        { useNewUrlParser: true })
        .then((client: MongoClient) => {
            const database = client.db('homework-07');
            return database;
        })
        .catch((error: Error) => error);
};
