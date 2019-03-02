// import db from '../db/models';
import { ICity } from '../models/city.model';
import { connectToMongoDb } from '../mongoDb';

class CityController {
    public getRandomCity() {
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
        });
    }
}

export default new CityController();
