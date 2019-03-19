import fs from 'fs';
import { Connection, Model } from 'mongoose';

interface IConfig {
    [modelName: string]: Model<any>;
}

export const moveDataToMongoDb = (config: IConfig) => {
    const promises = Object.keys(config).map((key: string) => {
        return new Promise((resolve, reject) => {
            console.log('Connected to mongo server.\nImport from file to DB started...');
            const dataStreamFromFile = fs.createReadStream(
                `./src/app/data/${key.toLowerCase()}.json`,
                { encoding: 'UTF-8' },
            );
            let data = '';

            dataStreamFromFile.on('data', (chunk: string) => {
                data += chunk;
            });

            dataStreamFromFile.on('end', () => {
                config[key].deleteMany({}, (error) => {
                    if (!error) {
                        config[key].insertMany(JSON.parse(data), (err) => {
                            if (err) {
                                reject();
                            } else {
                                resolve();
                            }
                        });
                    }
                });
            });

            dataStreamFromFile.on('error', (err) => {
                reject(err);
            });
        });
    });

    return Promise.all(promises);
};
