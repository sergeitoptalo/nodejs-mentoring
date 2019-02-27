import db from './models';
// import { moveDataToDb } from './helpers/moveDataToDb';

export const connectToDatabase = () => {
    /* const User = db.sequelize.import('./models/user');
    const Product = db.sequelize.import('./models/product'); */

    return db.sequelize.authenticate()
        .then(() => {
            console.log('Connected to database');

            /* moveDataToDb('./nodejs-mentoring/src/app/data/users.json', User)
                .then((data) => {
                    console.log(data);
                });
            moveDataToDb('./nodejs-mentoring/src/app/data/products.json', Product)
                .then((data) => {
                    console.log(data);
                }); */
        })
        .catch((error: any) => {
            console.log(error);
        });
};
