import express from 'express';
import fs from 'fs';
import { promisify } from 'util';

const productRouter = express.Router();

productRouter.param('id', (req, res, next, id) => {
    const readable = fs.createReadStream('./src/app/data/products.json');
    const writeAsync = promisify(fs.writeFile);
    let data: any = [];

    readable.on('data', (chunk) => {
        data.push(JSON.parse(chunk));
    });

    readable.on('end', () => {
        console.log(data);
        data = data[0].map((product: any) => product.id === id
            ? { ...product, reviews: product.reviews ? ++product.reviews : 1 }
            : product,
        );

        if (req.path.includes('review')) {
            const requiredProduct = data.filter((product: any) => product.id === id)[0];
            req.reviews = requiredProduct.reviews
                ? { reviews: requiredProduct.reviews }
                : { reviews: 0 };
            next();
        } else {
            req.productById = data.filter((product: any, index: any) => product.id === id)[0];
            writeAsync('./src/app/data/products.json', JSON.stringify(data))
                .then(() => {
                    next();
                });
        }
    });
});

productRouter.route('/')
    .get((req, res) => {
        const readable = fs.createReadStream('./src/app/data/products.json');
        readable.pipe(res);
    })
    .post((req, res) => {
        const readable = fs.createReadStream('./src/app/data/products.json');
        const writeAsync = promisify(fs.writeFile);
        let data: any = [];

        readable.on('data', (chunk) => {
            data.push(JSON.parse(chunk));
        });

        readable.on('end', () => {
            data[0].push(req.body);
            writeAsync('./src/app/data/products.json', JSON.stringify(data[0]))
                .then(() => {
                    res.json(req.body);
                });
        });
    });

productRouter.get('/:id', (req, res) => {
    res.json(req.productById);
});

productRouter.get('/:id/reviews', (req, res) => {
    res.json(req.reviews);
});

export default productRouter;
