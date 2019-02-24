import db from './models';

// const sq = new Sequelize('postgres://postgres:123@localhost:5432/homework06');
/* const User = sq.import('./models/user');
const Product = sq.import('./models/product'); */

export const connectToDatabase = () => {
    return db.sequelize.authenticate()
        .then(() => {
            console.log('Connected to database');

            /* moveDataToDb('./src/app/data/users.json', User)
                .then((data) => {
                    console.log(data);
                }); */
            /* moveDataToDb('./src/app/data/products.json', Product)
                .then((data) => {
                    console.log(data);
                }); */
        })
        .catch((error: any) => {
            console.log(error);
        });
};
