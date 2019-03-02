import { MongoClient } from 'mongodb';

export const connectToMongoDb = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(
            connectionString,
            { useNewUrlParser: true },
            (err, client: MongoClient) => {
                if (err) {
                    reject(err);
                } else {
                    const database = client.db('homework-07');
                    resolve(database);
                }
            });
    });
};
