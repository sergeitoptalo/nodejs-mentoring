// import db from '../db/models';
import { ICity } from '../models/city.model';
// import { connectToMongoDb } from '../mongoDb';
import City from '../mongoDb';

class CityController {
    public getRandomCity() {
        return new Promise((resolve, reject) => {
            City.count({}).exec((countError, count) => {
                const random = countError
                    ? 0
                    : Math.floor(Math.random() * count);

                City.findOne()
                    .skip(random)
                    .exec((err, city) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(city);
                        }
                    });
            });
        });
        /*
        --- MongoDB native driver

        return new Promise((resolve, reject) => {
            connectToMongoDb()
                .then((db: any) => {
                    const cities = db.collection('cities');
                    cities.aggregate([{ $sample: { size: 1 } }])
                        .next((err: Error, city: ICity) => {
                            if (err) {
                                resolve(null);
                            } else {
                                resolve(city);
                            }
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        }); */
    }
}

export default new CityController();
