// import db from '../db/models';
import { MongoError } from 'mongodb';
// import { connectToMongoDb } from '../mongoDb';
import { ICityDocument } from '../models/city.model';
import { City } from '../mongoDb/models';

class CityController {
    public getAllCities() {
        return City.find({})
            .then((cities) => cities)
            .catch((error) => error);
    }

    public addNewCity(newCity: ICityDocument) {
        return new Promise((resolve, reject) => {
            City.countDocuments({})
                .then((count: number) => {
                    newCity.cityId = count + 1;

                    City.create(newCity, (error: MongoError, city: ICityDocument) => {
                        if (error) {
                            reject(error);
                        }

                        resolve(city);
                    });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public updateCity(cityId: string, updatedCity: ICityDocument) {
        return City
            .findOneAndUpdate({ cityId }, updatedCity, { upsert: true, new: true })
            .then((city) => city)
            .catch((error) => error);
    }

    public deleteCity(cityId: string) {
        return City
            .deleteOne({ cityId: parseInt(cityId, 10) }, (error: MongoError) => {
                if (error) {
                    return error;
                }
                return 'Removed';
            });
    }

    public getRandomCity() {
        return new Promise((resolve, reject) => {
            City.countDocuments({})
                .exec((countError: Error, count: number) => {
                    const random = countError
                        ? 0
                        : Math.floor(Math.random() * count);

                    City.findOne()
                        .skip(random)
                        .exec((err: Error, city: ICityDocument) => {
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
