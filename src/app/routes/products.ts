import express from 'express';
import fs from 'fs';
import { promisify } from 'util';
import { productsDataPath } from '../config/constants';
import { IProduct } from '../models/product.model';

const productRouter = express.Router();

productRouter.param('id', (req, res, next, id) => {
    const readable = fs.createReadStream(productsDataPath);
    const writeAsync = promisify(fs.writeFile);
    let data: any = [];

    readable.on('data', (chunk) => {
        data.push(JSON.parse(chunk));
    });

    readable.on('end', () => {
        try {
            data = data[0].map((product: IProduct) => product.id === id
                ? { ...product, reviews: product.reviews ? ++product.reviews : 1 }
                : product,
            );
        } catch (error) {
            res.write('Please try again later');
        }

        if (req.path.includes('review')) {
            try {
                const requiredProduct = data.filter((product: IProduct) => product.id === id)[0];
                req.body = {
                    reviews: requiredProduct.reviews || 0,
                };
                next();
            } catch (error) {
                res.write('Please try again later');
            }
        } else {
            try {
                writeAsync(productsDataPath, JSON.stringify(data))
                    .then(() => {
                        next();
                    });
            } catch (error) {
                res.write('Please try again later');
            }
        }
    });
});

productRouter.route('/')
    .get((req, res) => {
        let readable;

        try {
            readable = fs.createReadStream(productsDataPath);
            readable.pipe(res);
        } catch (error) {
            res.write('Please try again later');
        }
    })
    .post((req, res) => {
        let readable;

        try {
            readable = fs.createReadStream(productsDataPath);
            const writeAsync = promisify(fs.writeFile);
            let data: IProduct[][] = [];

            readable.on('data', (chunk) => {
                data.push(JSON.parse(chunk));
            });

            readable.on('end', () => {
                data[0].push(req.body);
                try {
                    writeAsync(productsDataPath, JSON.stringify(data[0]))
                        .then(() => {
                            res.json(req.body);
                        });
                } catch {
                    res.write('Please try again later');
                }
            });
        } catch (error) {
            res.write('Data can not be added, please contact support');
        }
    });

productRouter.get('/:id', (req, res) => {
    const readFileAsync = promisify(fs.readFile);
    readFileAsync(productsDataPath)
        .then((data) =>
            JSON.parse(data.toString())
                .filter((product: IProduct) => product.id === req.params.id)[0])
        .then((productById) => {
            res.json(productById);
        });
});

productRouter.get('/:id/reviews', (req, res) => {
    res.json(req.body);
});

export default productRouter;
