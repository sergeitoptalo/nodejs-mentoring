import sequelize = require("sequelize");
import fs from 'fs';
import { promisify } from 'util';


export const moveDataToDb = (filePath: string, Model: any) => {
    const readFileAsync = promisify(fs.readFile);

    return new Promise((resolve, reject) => {
        readFileAsync(filePath)
            .then((data) => JSON.parse(data.toString()))
            .then((parsedData) => {
                parsedData.forEach((item: any) => {
                    Model.findOrCreate({ where: item, defaults: item })
                        .spread((user: any, created: any) => {
                            console.log(user.get({
                                plain: true
                            }));
                            console.log(created);
                        })
                        .then(() => {
                            resolve('Done');
                        })
                })
            })
            .catch((error) => {
                reject(error)
            });
    })
}
